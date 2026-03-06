/**
 * @fileoverview Componente de búsqueda interactivo.
 * Proporciona un campo de entrada con soporte para búsqueda reactiva,
 * estados de carga y mensajes de validación contextuales.
 *
 * @module SearchBar
 */

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Campo de búsqueda responsivo que soporta entrada de texto e IDs.
 * Utiliza Heroicons para feedback visual y gestiona estados de deshabilitado.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.value - El valor actual del campo de búsqueda.
 * @param {Function} props.onChange - Callback ejecutado al cambiar el contenido del input.
 * @param {Function} props.onSearch - Callback ejecutado al pulsar el botón de buscar.
 * @param {Function} [props.onPrefetch] - Callback opcional para precarga de datos al hover.
 * @param {boolean} props.isLoading - Indica si hay una búsqueda en curso.
 * @param {string} [props.helperText] - Texto de ayuda o error a mostrar debajo del input.
 * @param {boolean} [props.isError] - Si es `true`, aplica estilos de error al componente.
 *
 * @returns {JSX.Element} El componente de barra de búsqueda.
 */
function SearchBar(props) {
    const {
        value,
        onChange,
        onSearch,
        onPrefetch,
        isLoading,
        helperText,
        isError,
    } = props;
    
    return (
        <div className="flex flex-col items-center w-full max-w-lg mx-auto my-8 px-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="relative w-full group">
                    <input
                        id="userId"
                        type="text"
                        placeholder="ID (1-10) o Nombre..."
                        value={value}
                        onChange={onChange}
                        className={cn(
                            "w-full px-5 py-3 bg-white/90 dark:bg-slate-800/90 border-2 rounded-xl transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-medium",
                            isError
                                ? "border-red-400 focus:ring-red-500/20"
                                : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
                        )}
                    />
                </div>
                <button
                    onClick={onSearch}
                    onMouseEnter={onPrefetch}
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
                <p
                    className={cn(
                        "mt-3 text-sm font-medium",
                        isError ? "text-red-500" : "text-slate-500 dark:text-slate-400"
                    )}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
}

SearchBar.propTypes = {
    /** Valor actual controlado por el padre. */
    value: PropTypes.string.isRequired,
    /** Manejador de cambios. */
    onChange: PropTypes.func.isRequired,
    /** Manejador de ejecución de búsqueda. */
    onSearch: PropTypes.func.isRequired,
    /** Callback para eventos de pre-recuperación. */
    onPrefetch: PropTypes.func,
    /** Estado de carga global. */
    isLoading: PropTypes.bool.isRequired,
    /** Mensaje informativo o de error dinámico. */
    helperText: PropTypes.string,
    /** Flag para activar estilos visuales de error. */
    isError: PropTypes.bool,
};

export default SearchBar;
