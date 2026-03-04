import PropTypes from "prop-types";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Layout principal con soporte para i18n y modo oscuro.
 * @component
 */
function MainLayout({ children }) {
  const { t, language, toggleLanguage } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              U
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              {t('app_title')}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Toggle de Idioma */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all active:scale-95"
            >
              {language.toUpperCase()}
            </button>
            <ThemeToggleButton />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} {t('app_title')} Pro. {t('footer_text')}
        </div>
      </footer>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
