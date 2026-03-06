import { Component } from "react";
import PropTypes from "prop-types";

/**
 * Componente ErrorBoundary para capturar errores de renderizado en React.
 * Proporciona una UI de respaldo amigable en lugar de un crash blanco.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de repuesto.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Aquí se podría enviar el error a un servicio como Sentry o LogRocket
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Algo salió mal
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              La aplicación encontró un error inesperado. Por favor, intenta recargar la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              Recargar Aplicación
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
