import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "@/redux/uiSlice";
import { translations } from "@/lib/translations";
import { useCallback, useMemo } from "react";

/**
 * Hook de Internacionalización de Alto Rendimiento.
 * Optimizado con useMemo y useCallback para evitar re-renders.
 * 
 * @category Hooks
 * @returns {Object} t, language, toggleLanguage
 */
export const useTranslation = () => {
  const { language } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  /**
   * Función de traducción memoizada.
   */
  const t = useCallback((key) => {
    return translations[language]?.[key] || key;
  }, [language]);

  /**
   * Alternar idioma con persistencia.
   */
  const toggleLanguage = useCallback(() => {
    const nextLang = language === "es" ? "en" : "es";
    dispatch(setLanguage(nextLang));
  }, [dispatch, language]);

  return useMemo(() => ({ 
    t, 
    language, 
    toggleLanguage 
  }), [t, language, toggleLanguage]);
};
