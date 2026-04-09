/**
 * @fileoverview Implementación del patrón State Boundary.
 * Proporciona un mecanismo declarativo para gestionar transiciones de estado
 * (carga, error, éxito) en la interfaz de usuario.
 *
 * @module StateBoundary
 */

import { memo, Suspense } from "react";
import PropTypes from "prop-types";
import { cn } from "@/shared/lib/utils";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import NotFoundCard from "@/shared/ui/NotFoundCard";
import { Spinner } from "@/shared/ui/FormElements";

const DefaultLoading = () => (
    <div className="flex items-center justify-center p-8 animate-pulse text-slate-500 dark:text-slate-400">
        <div className="flex flex-col items-center gap-2">
            <Spinner />
            <p className="text-sm font-medium">Cargando contenido...</p>
        </div>
    </div>
);

/**
 * Componente que orquesta el renderizado condicional basado en el estado de una petición.
 * Soporta composición con Suspense para React 19+ y patrones de renderizado declarativo.
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
        const renderContent = () => {
            switch (status) {
                case "loading":
                    return Loading ? (
                        <Loading />
                    ) : (
                        <DefaultLoading />
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
                    return children;

                case "idle":
                default:
                    return null;
            }
        };

        return (
            <Suspense fallback={Loading ? <Loading /> : <DefaultLoading />}>
                <div className={cn(status === "succeeded" && className)}>
                    {renderContent()}
                </div>
            </Suspense>
        );
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
