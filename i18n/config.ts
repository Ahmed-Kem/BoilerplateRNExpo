import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Import translation files
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

// Get device language, fallback to English if not supported
const getDeviceLanguage = () => {
  const locale = Localization.getLocales()[0]?.languageCode || "en";
  return Object.keys(resources).includes(locale) ? locale : "en";
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: "en",
    compatibilityJSON: "v4" as const,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
