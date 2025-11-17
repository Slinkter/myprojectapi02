import React from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../hooks/useTheme";

/**
 * Un botón flotante que permite al usuario cambiar entre el modo claro y oscuro.
 */
const ThemeToggleButton = () => {
    // Usa el custom hook para obtener el tema actual y la función para cambiarlo.
    const { theme, toggleTheme } = useTheme();

    return (
        <Tooltip
            content={
                theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
            }
            placement="left"
            className="theme-toggle__tooltip"
        >
            <IconButton
                onClick={toggleTheme}
                variant="text"
                className="theme-toggle"
                aria-label="Cambiar tema"
            >
                {/* IconButton centra y ajusta el tamaño del ícono automáticamente */}
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
