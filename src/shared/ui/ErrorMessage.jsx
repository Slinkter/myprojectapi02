/**
 * @fileoverview Componente visual para mostrar mensajes de error de infraestructura.
 * Diseñado para ser utilizado dentro de StateBoundary ante fallos controlados de API.
 *
 * @module ErrorMessage
 */

import { memo } from "react";
import PropTypes from "prop-types";
import { cn } from "@/shared/lib/utils";

/**
 * Muestra una tarjeta de error estilizada con opción de reintento.
 *
 * @component
 */
const ErrorMessage = memo(({ message, onRetry }) => {
    const displayMessage = message || "¡Ups! Algo salió mal";

    return (
        <div
            role="alert"
            aria-live="assertive"
            className={cn(
                "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-3xl p-8 text-center shadow-sm animate-in fade-in slide-in-from-top-4 duration-300 ease-out",
            )}
        >
            <div
                className={cn(
                    "w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4",
                )}
                aria-hidden="true"
            >
                <span className={cn("text-3xl text-red-600")}>⚠️</span>
            </div>
            <h3
                className={cn(
                    "text-xl font-bold text-red-900 dark:text-red-400 mb-2",
                )}
            >
                ¡Ups! Algo salió mal
            </h3>
            <p
                className={cn(
                    "text-red-700 dark:text-red-500/80 mb-6 font-medium leading-relaxed",
                )}
            >
                {displayMessage}
            </p>
            {onRetry && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        onRetry();
                    }}
                    aria-label="Reintentar la operación"
                    className={cn(
                        "px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-sm active:scale-95 outline-none focus:ring-2 focus:ring-red-500/50",
                    )}
                >
                    Reintentar
                </button>
            )}
        </div>
    );
});

ErrorMessage.displayName = "ErrorMessage";

ErrorMessage.propTypes = {
    /** Mensaje o descripción del error. */
    message: PropTypes.string,
    /** Función que se dispara al pulsar el botón de reintentar. */
    onRetry: PropTypes.func,
};

export default ErrorMessage;
