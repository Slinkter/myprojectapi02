import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/hooks/useTheme";

/**
 * Botón para alternar entre temas claro y oscuro.
 * Refactorizado para corregir error de propiedad y compatibilidad con Tailwind v4.
 * @component
 */
function ThemeToggleButton() {
  // CORRECCIÓN: Usar 'isDark' en lugar de 'isDarkMode' para coincidir con el hook
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-slate-600 dark:text-blue-400 group shadow-sm active:scale-95 focus:ring-2 focus:ring-blue-500 outline-none"
    >
      {isDark ? (
        <SunIcon className="h-5 w-5 animate-in spin-in-12 duration-500" />
      ) : (
        <MoonIcon className="h-5 w-5 animate-in zoom-in-50 duration-500" />
      )}
    </button>
  );
}

export default ThemeToggleButton;
