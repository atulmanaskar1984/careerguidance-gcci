// Function to load HTML content into a target element
async function loadHTML(elementId, filePath) {
  try {
    // Fetch the external HTML file
    const response = await fetch(filePath);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
    }

    // Extract HTML text from the response
    const html = await response.text();

    // Insert the HTML into the target element
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    } else {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    console.log("Successfully loaded content from", filePath);
  } catch (error) {
    console.error("Error loading content:", error);
    // Optional: Display a fallback message in the UI
    document.getElementById(elementId).innerHTML =
      `<p>Error loading content.</p>`;
  }
}

// Function to load an external JavaScript file
function loadJS(filePath) {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${filePath}"]`);

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        resolve();
        return;
      }

      existingScript.addEventListener(
        "load",
        () => {
          existingScript.dataset.loaded = "true";
          resolve();
        },
        { once: true },
      );

      existingScript.addEventListener(
        "error",
        () => reject(new Error(`Failed to load ${filePath}`)),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = filePath;
    script.defer = true;

    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );

    script.addEventListener(
      "error",
      () => reject(new Error(`Failed to load ${filePath}`)),
      { once: true },
    );

    document.head.appendChild(script);
  });
}

// Load header and footer when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  async function loadHeaderFooter() {
    await loadHTML("header", "../includes/header.html"); // Load header into #header
    await loadJS("js/multilingual.js"); // Load shared multilingual behavior
    await loadHTML("footer", "../includes/footer.html"); // Load footer into #footer
    await loadHTML("contact-floating", "../includes/contact-floating.html"); // Load contact floating into #contact-floating

    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");
    if (navToggle) {
      navToggle.addEventListener("click", function () {
        mainNav.classList.toggle("open");
        const expanded = mainNav.classList.contains("open");
        navToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      });
    }
  }

  loadHeaderFooter();
});
