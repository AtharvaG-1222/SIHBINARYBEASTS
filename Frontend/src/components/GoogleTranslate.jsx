import React, { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Remove any previous script
    const oldScript = document.getElementById("google-translate-script");
    if (oldScript) oldScript.remove();

    // Add Google Translate script
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Global init function required by Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,ta,ml,kn,mr,bn,te",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  return <div id="google_translate_element" className="text-sm"></div>;
}
