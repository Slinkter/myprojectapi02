import PropTypes from "prop-types";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Componente para mostrar mensajes de error de infraestructura.
 */
function ErrorMessage({ message, onRetry }) {
  const { t } = useTranslation();

  return (
    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-3xl p-8 text-center shadow-lg animate-in slide-in-from-top-4 duration-500">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl text-red-600">⚠️</span>
      </div>
      <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">
        {t("error.title")}
      </h3>
      <p className="text-red-700 dark:text-red-500/80 mb-6 font-medium">
        {t(message) || t("error.generic")}
      </p>
      <button
        onClick={onRetry}
        className="px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
      >
        {t("error.retry")}
      </button>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
