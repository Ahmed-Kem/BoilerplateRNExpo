import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../context/language-context";

export function useAppTranslation() {
  const { i18n } = useTranslation();
  const { setLanguage } = useLanguageStore();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return {
    t: i18n.t,
    changeLanguage,
    currentLanguage: i18n.language,
  };
}
