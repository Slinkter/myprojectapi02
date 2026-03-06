import PropTypes from "prop-types";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Tarjeta de error cuando un usuario no existe.
 */
function NotFoundCard({ attemptedId }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-5xl">🔍</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        {t("user.notFoundTitle")}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-2">
        {t("user.notFoundDesc")} <span className="font-bold text-blue-600 dark:text-blue-400">&quot;{attemptedId}&quot;</span>.
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-500 italic">
        {t("search.description")}
      </p>
    </div>
  );
}

NotFoundCard.propTypes = {
  attemptedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NotFoundCard;
