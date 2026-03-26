/**
 * @fileoverview Componente de búsqueda interactivo.
 * Proporciona un campo de entrada con soporte para búsqueda reactiva,
 * estados de carga y mensajes de validación contextuales.
 *
 * @module SearchBar
 */

import { memo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Campo de búsqueda responsivo que soporta entrada de texto e IDs.
 * Utiliza Heroicons para feedback visual y gestiona estados de deshabilitado.
 *
 * @component
 */
const SearchBar = memo((props) => {
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
        <div
            className={
                "flex flex-col  items-center w-full max-w-lg mx-auto my-8 px-4"
            }
        >
            <div className={cn("flex flex-col sm:flex-row gap-4 w-full ")}>
                <div className={cn("relative w-full group")}>
                    <input
                        id="userId"
                        type="text"
                        aria-describedby="search-helper"
                        placeholder="ID (1-10) o Nombre..."
                        value={value}
                        onChange={onChange}
                        className={cn(
                            "w-full px-5 py-3 bg-white/90 dark:bg-slate-800/90 border-2 rounded-xl transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-medium outline-none",
                            isError
                                ? "border-red-400 focus:ring-red-500/20"
                                : "border-slate-200 dark:border-slate-700  ",
                        )}
                    />
                </div>
                <button
                    onClick={onSearch}
                    onMouseEnter={onPrefetch}
                    disabled={!value || isLoading || isError}
                    aria-busy={isLoading}
                    className={cn(
                        "w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 outline-none",
                    )}
                >
                    {isLoading ? (
                        <div
                            className={cn(
                                "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin",
                            )}
                        />
                    ) : (
                        <MagnifyingGlassIcon className={cn("h-5 w-5")} />
                    )}
                    <span>Buscar</span>
                </button>
            </div>
            {helperText && (
                <p
                    id="search-helper"
                    aria-live="polite"
                    className={cn(
                        "mt-3 text-sm font-medium",
                        isError
                            ? "text-red-500"
                            : "text-slate-500 dark:text-slate-400",
                    )}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
});

SearchBar.displayName = "SearchBar";

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
