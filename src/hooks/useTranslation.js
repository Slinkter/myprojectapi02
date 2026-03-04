import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "@/redux/uiSlice";
import { translations } from "@/lib/translations";

/**
 * Hook personalizado para acceder a las traducciones.
 */
export const useTranslation = () => {
  const { language } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    const nextLang = language === "es" ? "en" : "es";
    dispatch(setLanguage(nextLang));
  };

  return { t, language, toggleLanguage };
};
