import { useState, useEffect, useCallback } from "react";

/**
 * Un custom hook para gestionar el tema de la aplicación (claro/oscuro).
 *
 * - Lee el tema guardado en localStorage o la preferencia del sistema.
 * - Aplica la clase 'dark' al elemento <html> para que Tailwind CSS funcione.
 * - Proporciona una función para alternar entre los temas.
 *
 * @returns {{theme: string, toggleTheme: function}} Un objeto con el tema actual y la función para cambiarlo.
 */
export const useTheme = () => {
    // Inicializa el estado del tema, dando prioridad a localStorage,
    // luego a la preferencia del sistema, y finalmente a 'light' por defecto.
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "light";

        const savedTheme = window.localStorage.getItem("theme");
        if (savedTheme) return savedTheme;

        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        return prefersDark ? "dark" : "light";
    });

    // Efecto que se ejecuta cada vez que el estado 'theme' cambia.
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark"); // Limpia clases anteriores
        root.classList.add(theme); // Añade la clase del tema actual

        // Guarda la preferencia del usuario en localStorage.
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    // Función para cambiar el tema, memorizada con useCallback.
    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }, []);

    return { theme, toggleTheme };
};
