import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "@/redux/uiSlice";
import { translations } from "@/lib/translations";
import { useCallback, useMemo } from "react";

/**
 * Hook de Internacionalización de Alto Rendimiento.
 * Soporta acceso jerárquico por puntos (ej: "search.title").
 * 
 * @returns {Object} t, currentLanguage, toggleLanguage
 */
export const useTranslation = () => {
  const { language: currentLanguage } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  /**
   * Función de traducción con soporte para acceso por puntos.
   * Sigue Clean Code: Maneja recursión simple para navegar el diccionario.
   */
  const t = useCallback((path) => {
    const keys = path.split(".");
    let result = translations[currentLanguage];

    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path; // Retorna la ruta si no encuentra la clave.
      }
    }

    return result;
  }, [currentLanguage]);

  const toggleLanguage = useCallback(() => {
    const nextLang = currentLanguage === "es" ? "en" : "es";
    dispatch(setLanguage(nextLang));
  }, [dispatch, currentLanguage]);

  return useMemo(() => ({ 
    t, 
    language: currentLanguage, 
    toggleLanguage 
  }), [t, currentLanguage, toggleLanguage]);
};
