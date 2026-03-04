import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';

/**
 * Componente de búsqueda con Pre-fetching optimizado para Vercel Best Practices.
 * @component
 */
function SearchBar({ value, onChange, onSearch, onPrefetch, isLoading, helperText, isError }) {
  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto my-8 px-4">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative w-full group">
          <label htmlFor="userId" className="sr-only">ID o Nombre</label>
          <input
            id="userId"
            type="text"
            placeholder="ID (1-10) o Nombre..."
            value={value}
            onChange={onChange}
            className={`w-full px-5 py-3 bg-white/90 dark:bg-slate-800/90 border-2 rounded-xl transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-medium ${
              isError 
                ? 'border-red-400 focus:ring-red-500/20' 
                : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
        </div>
        <button
          onClick={onSearch}
          onMouseEnter={onPrefetch} // Vercel Best Practice: Pre-fetch al hacer hover
          disabled={!value || isLoading || isError}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 outline-none"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5" />
          )}
          <span>Buscar</span>
        </button>
      </div>
      {helperText && (
        <p className={`mt-3 text-sm font-medium ${isError ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onPrefetch: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  helperText: PropTypes.string,
  isError: PropTypes.bool,
};

export default SearchBar;
