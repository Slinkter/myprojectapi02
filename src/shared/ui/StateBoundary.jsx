/**
 * @fileoverview Implementación del patrón State Boundary.
 * Proporciona un mecanismo declarativo para gestionar transiciones de estado
 * (carga, error, éxito) en la interfaz de usuario.
 *
 * @module StateBoundary
 */

import { memo } from "react";
import PropTypes from "prop-types";
import { cn } from "@/shared/lib/utils";

/**
 * Componente que orquesta el renderizado condicional basado en el estado de una petición.
 * Permite inyectar componentes personalizados para cada estado o utilizar fallbacks.
 *
 * @component
 */
const StateBoundary = memo(
    ({
        status,
        error,
        onRetry,
        loadingComponent: Loading,
        errorComponent: ErrorComp,
        notFoundComponent: NotFound,
        className = "",
        children,
    }) => {
        switch (status) {
            case "loading":
                return Loading ? (
                    <Loading />
                ) : (
                    <div className={cn("flex items-center justify-center p-8 animate-pulse text-slate-500 dark:text-slate-400")}>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-slate-300 dark:border-slate-600 border-t-blue-600 rounded-full animate-spin" />
                            <p className="text-sm font-medium">Cargando contenido...</p>
                        </div>
                    </div>
                );

            case "failed":
                return ErrorComp ? (
                    <ErrorComp message={error} onRetry={onRetry} />
                ) : (
                    <div className={cn("p-8 text-center border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-2xl")}>
                        <p className="text-red-600 dark:text-red-400 font-semibold">{error || "Error inesperado"}</p>
                        {onRetry && (
                            <button 
                                onClick={onRetry} 
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
                            >
                                Reintentar
                            </button>
                        )}
                    </div>
                );

            case "notFound":
                return NotFound ? (
                    <NotFound />
                ) : (
                    <div className={cn("p-8 text-center border border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10 rounded-2xl")}>
                        <p className="text-orange-600 dark:text-orange-400 font-semibold">
                            Recurso no encontrado.
                        </p>
                    </div>
                );

            case "succeeded":
                return <div className={cn(className)}>{children}</div>;

            case "idle":
            default:
                return null;
        }
    },
);

StateBoundary.displayName = "StateBoundary";

StateBoundary.propTypes = {
    /** Estado actual de la operación asíncrona. */
    status: PropTypes.oneOf([
        "idle",
        "loading",
        "succeeded",
        "failed",
        "notFound",
    ]).isRequired,
    /** Mensaje de error opcional. */
    error: PropTypes.string,
    /** Callback para reintentar una operación fallida. */
    onRetry: PropTypes.func,
    /** Componente (no instancia) para el estado de carga. */
    loadingComponent: PropTypes.elementType,
    /** Componente (no instancia) para el estado de error. */
    errorComponent: PropTypes.elementType,
    /** Componente (no instancia) para el estado no encontrado. */
    notFoundComponent: PropTypes.elementType,
    /** Clase CSS adicional para el contenedor de éxito. */
    className: PropTypes.string,
    /** Contenido para el estado de éxito. */
    children: PropTypes.node,
};

export default StateBoundary;
