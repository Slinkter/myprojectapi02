import { useState, useEffect } from "react";

/**
 * @fileoverview Custom Hook para gestionar el tema visual de la aplicación.
 * Proporciona funcionalidad para alternar entre modo claro y oscuro
 * con persistencia en localStorage.
 *
 * @module useTheme
 * @category Hooks
 * @since 1.0.0
 */

/**
 * Custom Hook para gestionar el tema visual (claro/oscuro) de la aplicación.
 *
 * Este hook encapsula la lógica para:
 * - Leer el tema guardado en localStorage
 * - Aplicar la clase 'dark' al elemento HTML
 * - Persistir la preferencia del usuario
 * - Proporcionar una función para alternar el tema
 *
 * El tema se guarda en localStorage con la clave 'theme' y puede ser 'light' o 'dark'.
 * Al cargar la aplicación, se lee el valor guardado y se aplica automáticamente.
 *
 * @hook
 * @category Theme Management
 *
 * @returns {Object} Objeto con el estado del tema y función para cambiarlo.
 * @returns {boolean} returns.isDark - `true` si el tema actual es oscuro, `false` si es claro.
 * @returns {Function} returns.toggleTheme - Función para alternar entre tema claro y oscuro.
 *
 * @example
 * // Uso básico en un componente
 * function ThemeToggleButton() {
 *   const { isDark, toggleTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
 *     </button>
 *   );
 * }
 *
 * @example
 * // Uso con renderizado condicional
 * function App() {
 *   const { isDark } = useTheme();
 *
 *   return (
 *     <div className={isDark ? 'dark-theme' : 'light-theme'}>
 *       <Header />
 *       <Content />
 *     </div>
 *   );
 * }
 *
 * @example
 * // Aplicar estilos basados en el tema
 * function Card() {
 *   const { isDark } = useTheme();
 *
 *   const cardStyle = {
 *     backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
 *     color: isDark ? '#ffffff' : '#000000'
 *   };
 *
 *   return <div style={cardStyle}>Card Content</div>;
 * }
 *
 * @see {@link ThemeToggleButton} - Componente que utiliza este hook.
 *
 * @since 1.0.0
 * @version 1.0.0
 */
export const useTheme = () => {
  /**
   * Estado que indica si el tema oscuro está activo.
   * Se inicializa leyendo el valor guardado en localStorage.
   *
   * @type {boolean}
   */
  const [isDark, setIsDark] = useState(() => {
    // Leer el tema guardado en localStorage al inicializar
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  /**
   * Efecto que se ejecuta cada vez que cambia el tema.
   * Aplica o remueve la clase 'dark' del elemento HTML
   * y guarda la preferencia en localStorage.
   */
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDark) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  /**
   * Alterna entre el tema claro y oscuro.
   *
   * @function toggleTheme
   * @returns {void}
   *
   * @example
   * <button onClick={toggleTheme}>Cambiar Tema</button>
   */
  const toggleTheme = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };

  return {
    isDark,
    toggleTheme,
  };
};
