const translations = {
  en: {
    bannerTitle: "Plan your next step with confidence",
    bannerSubTitle:
      "Free, board-aware guidance for Class 10 and 12 students across India — choose the right stream, subjects and college path.",
  },
  hi: {
    bannerTitle: "आत्मविश्वास के साथ अपने अगले कदम की योजना बनाएं।",
    bannerSubTitle:
      "पूरे भारत में 10वीं और 12वीं कक्षा के छात्रों के लिए बोर्ड-के हिसाब से मुफ़्त गाइडेंस — सही स्ट्रीम, विषय और कॉलेज का रास्ता चुनें।",
  },
  mr: {
    bannerTitle: "आत्मविश्वासाने तुमच्या पुढील पावलाचे नियोजन करा",
    bannerSubTitle:
      "संपूर्ण भारतातील इयत्ता १० वी आणि १२ वीच्या विद्यार्थ्यांसाठी परीक्षा मंडळाच्या (बोर्डाच्या) निकषांवर आधारित मोफत मार्गदर्शन — योग्य शाखा, विषय आणि महाविद्यालयीन मार्ग निवडा.",
  },
};

var selLang = localStorage.getItem("selectedLanguage") || "en";
document.getElementById("languageSwitcher").value = selLang;
updateContent();

document
  .getElementById("languageSwitcher")
  .addEventListener("change", function () {
    selLang = this.value;
    localStorage.setItem("selectedLanguage", selLang);
    updateContent();
  });

function updateContent() {
  document.getElementById("bannerTitle").textContent =
    translations[selLang].bannerTitle;
  document.getElementById("bannerSubTitle").textContent =
    translations[selLang].bannerSubTitle;
}
