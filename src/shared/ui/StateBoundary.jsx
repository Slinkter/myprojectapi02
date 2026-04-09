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
import ErrorMessage from "@/shared/ui/ErrorMessage";
import NotFoundCard from "@/shared/ui/NotFoundCard";

/**
 * Componente que orquesta el renderizado condicional basado en el estado de una petición.
 * Actúa como un coordinador de componentes presentacionales.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.status - Estado actual de la operación asíncrona ("idle", "loading", "succeeded", "failed", "notFound").
 * @param {string} [props.error] - Mensaje de error opcional.
 * @param {function} [props.onRetry] - Callback para reintentar una operación fallida.
 * @param {React.ElementType} [props.loadingComponent] - Componente personalizado para el estado de carga.
 * @param {React.ElementType} [props.errorComponent] - Componente personalizado para el estado de error.
 * @param {React.ElementType} [props.notFoundComponent] - Componente personalizado para el estado no encontrado.
 * @param {string} [props.className] - Clase CSS adicional para el contenedor de éxito.
 * @param {React.ReactNode} props.children - Contenido para el estado de éxito.
 * @returns {JSX.Element|null} El componente correspondiente al estado actual o null.
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

            case "failed": {
                const ErrorUI = ErrorComp || ErrorMessage;
                return <ErrorUI message={error} onRetry={onRetry} />;
            }

            case "notFound": {
                const NotFoundUI = NotFound || NotFoundCard;
                return <NotFoundUI attemptedId={error} />;
            }

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
    /** Mensaje de error o identificador no encontrado. */
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
