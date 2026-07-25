# Google Sheets Integration Guide for Contact Form

This guide helps you set up a Google Sheet to automatically store submissions from the website's Contact Us form. 

Follow these steps using your own Google Account to enable the integration.

---

## Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. In the first row (Row 1), add these column headers exactly as written (case-sensitive):
   * **Cell A1:** `Timestamp`
   * **Cell B1:** `name`
   * **Cell C1:** `class`
   * **Cell D1:** `board`
   * **Cell E1:** `contact`
   * **Cell F1:** `message`

---

## Step 2: Open and Configure Apps Script
1. Inside your Google Sheet, click **Extensions** in the top menu, then select **Apps Script**.
2. Delete any code currently in the editor (usually `function myFunction() { ... }`).
3. Paste the following script into the editor:

```javascript
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for other submissions to finish writing
  
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheets()[0]; // Use the first sheet in the spreadsheet
    
    // Get headers from the first row of the sheet
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;
    
    const newRow = headers.map(function(header) {
      if (header === 'Timestamp') {
        return new Date(); // Automatically insert submission date/time
      }
      return e.parameter[header] || ''; // Match header name with form field 'name' attribute
    });
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

4. Click the **Save** icon (floppy disk) or press `Ctrl+S` / `Cmd+S`.

---

## Step 3: Deploy the Script as a Web App
1. Click the **Deploy** button in the top right corner and choose **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the options:
   * **Description:** `Contact Form API`
   * **Execute as:** `Me (your-email@gmail.com)`
   * **Who has access:** `Anyone` *(This is important so the public website form can send submissions to your sheet).*
4. Click **Deploy**.
5. When prompted, click **Authorize access**, select your Google account, click **Advanced** -> **Go to Untitled project (unsafe)**, and click **Allow**.
6. Copy the **Web app URL** provided in the "New deployment" window.

---

## Step 4: Add URL to the Codebase
1. Open the file `js/main.js` in the website files.
2. Locate the line at the top:
   ```javascript
   const GOOGLE_SHEET_URL = '';
   ```
3. Paste your Web app URL between the single quotes. For example:
   ```javascript
   const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/XXXXX/exec';
   ```
4. Save the file. Your form is now live and saving submissions directly to your Google Sheet!
