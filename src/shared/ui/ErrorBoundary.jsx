/**
 * @fileoverview Componente de límite de errores (Error Boundary).
 * Captura excepciones de JavaScript en cualquier parte de su árbol de componentes
 * hijo, registra esos errores y muestra una interfaz de repuesto.
 *
 * @module ErrorBoundary
 */

import { Component } from "react";
import PropTypes from "prop-types";
import { memo } from "react";
import { cn } from "@/shared/lib/utils";

/**
 * Componente presentacional para mostrar la interfaz de error.
 * Es un Dumb Component que recibe el error y la función de reinicio.
 *
 * @component
 */
const ErrorFallback = memo(({ error, reset }) => {
    return (
        <div
            className={cn(
                "min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4",
            )}
            role="alert"
            aria-live="assertive"
        >
            <div
                className={cn(
                    "max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-8 text-center border-2 border-slate-200 dark:border-slate-800",
                )}
            >
                <div
                    className={cn(
                        "w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6",
                    )}
                    aria-hidden="true"
                >
                    <span className="text-4xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Algo salió mal
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    {error ? error.message : "La aplicación encontró un error inesperado. Por favor, intenta recargar la página."}
                </p>
                <button
                    onClick={reset}
                    className={cn(
                        "w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 outline-none focus:ring-2 focus:ring-blue-500/50",
                    )}
                >
                    Recargar Aplicación
                </button>
            </div>
        </div>
    );
});

ErrorFallback.displayName = "ErrorFallback";

ErrorFallback.propTypes = {
    /** El error capturado. */
    error: PropTypes.object,
    /** Función para reiniciar el estado del Error Boundary. */
    reset: PropTypes.func.isRequired,
};

/**
 * Componente de clase que implementa el patrón Error Boundary de React.
 * Previene que toda la aplicación se desmonte ante un error inesperado
 * en la fase de renderizado.
 *
 * @component
 * @augments {Component<Object, Object>}
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    /**
     * Actualiza el estado para mostrar la interfaz de repuesto en el siguiente renderizado.
     *
     * @static
     * @param {Error} error - El error que fue lanzado.
     * @returns {Object} El nuevo estado del componente.
     */
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    /**
     * Captura información adicional sobre el error para propósitos de registro.
     *
     * @param {Error} error - El error lanzado.
     * @param {React.ErrorInfo} errorInfo - Información sobre el componente que lanzó el error.
     */
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    /**
     * Reinicia el estado del Error Boundary para intentar renderizar los hijos nuevamente.
     */
    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback({
                    error: this.state.error,
                    reset: this.handleReset,
                });
            }

            return <ErrorFallback error={this.state.error} reset={this.handleReset} />;
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    /** Componentes hijos que serán protegidos por este límite de error. */
    children: PropTypes.node.isRequired,
    /** Componente opcional para renderizar en caso de error. Recibe {error, reset}. */
    fallback: PropTypes.func,
};

export default ErrorBoundary;
