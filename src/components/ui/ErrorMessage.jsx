/**
 * @fileoverview Componente visual para mostrar mensajes de error de infraestructura.
 * Diseñado para ser utilizado dentro de StateBoundary ante fallos controlados de API.
 * 
 * @module ErrorMessage
 */

import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Muestra una tarjeta de error estilizada con opción de reintento.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.message - Mensaje de error a mostrar.
 * @param {Function} props.onRetry - Función de callback para reintentar la operación fallida.
 * @returns {JSX.Element} El componente de error visual.
 * 
 * @example
 * ```tsx
 * <ErrorMessage 
 *   message="Error de red" 
 *   onRetry={() => fetchData()} 
 * />
 * ```
 */
function ErrorMessage({ message, onRetry }) {
  // Mapeo simple para mantener compatibilidad si se pasan claves de error viejas.
  const displayMessage = message === "error.generic" ? "Error desconocido de infraestructura." : (message || "¡Ups! Algo salió mal");

  return (
    <div className={cn(
      "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-3xl p-8 text-center shadow-lg animate-in slide-in-from-top-4 duration-500"
    )}>
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl text-red-600">⚠️</span>
      </div>
      <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">
        ¡Ups! Algo salió mal
      </h3>
      <p className="text-red-700 dark:text-red-500/80 mb-6 font-medium">
        {displayMessage}
      </p>
      <button
        onClick={onRetry}
        className={cn(
          "px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
        )}
      >
        Reintentar
      </button>
    </div>
  );
}

ErrorMessage.propTypes = {
  /** Mensaje o descripción del error. */
  message: PropTypes.string,
  /** Función que se dispara al pulsar el botón de reintentar. */
  onRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
