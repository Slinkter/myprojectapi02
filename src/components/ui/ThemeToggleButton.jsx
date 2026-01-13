import { IconButton, Tooltip } from "@material-tailwind/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "@/hooks/useTheme";

/**
 * Un botón flotante que permite al usuario cambiar entre el modo claro y oscuro.
 */
const ThemeToggleButton = () => {
  // Usa el custom hook para obtener el tema actual y la función para cambiarlo.
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip
      placement="left"
      className="theme-toggle__tooltip"
      content={theme === "dark" ? " modo claro" : " modo oscuro"}
    >
      <IconButton
        onClick={toggleTheme}
        variant="text"
        className="theme-toggle"
        aria-label="Cambiar tema"
      >
        {theme === "dark" ? (
          <SunIcon className="theme-toggle__icon" />
        ) : (
          <MoonIcon className="theme-toggle__icon" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
