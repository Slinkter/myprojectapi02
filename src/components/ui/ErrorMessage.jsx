import { ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';

/**
 * Componente para mostrar mensajes de error con opción de reintento.
 * Estilizado con Tailwind CSS v4 puro.
 * @component
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center text-center">
        <ExclamationCircleIcon className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-red-800 mb-2">¡Ups! Algo salió mal</h3>
        <p className="text-red-600 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md active:scale-95"
        >
          <ArrowPathIcon className="h-5 w-5" />
          Reintentar
        </button>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
