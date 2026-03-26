/**
 * @fileoverview Componente de botón para la gestión del tema visual.
 * Permite al usuario alternar entre el modo claro (light) y oscuro (dark).
 *
 * @module ThemeToggleButton
 */

import { memo } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

/**
 * Botón interactivo para cambiar el tema de la aplicación.
 * Utiliza el hook `useTheme` para persistir y aplicar los cambios globales.
 * Incluye animaciones de entrada dinámicas y soporte de accesibilidad.
 *
 * @component
 * @returns {JSX.Element} El botón de alternancia de tema.
 */
const ThemeToggleButton = memo(() => {
    // Integración con la lógica de persistencia y aplicación de CSS 'dark'.
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label={
                isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
            className={cn(
                "p-2.5 rounded-4xl transition-all duration-300 group shadow-sm active:scale-95 focus:ring-2 focus:ring-blue-500 outline-none",
                "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-blue-400",
            )}
        >
            {isDark ? (
                <SunIcon className="h-5 w-5 animate-in spin-in-12 duration-500" />
            ) : (
                <MoonIcon className="h-5 w-5 animate-in zoom-in-50 duration-500" />
            )}
        </button>
    );
});

ThemeToggleButton.displayName = "ThemeToggleButton";

export default ThemeToggleButton;
