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
import { cn } from "@/shared/lib/utils";

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
                "flex flex-col items-center w-full max-w-lg mx-auto mb-golden-lg px-golden-sm"
            }
        >
            <div className={cn("flex flex-col sm:flex-row gap-golden-base w-full")}>
                <div className={cn("relative w-full group")}>
                    {/* A11Y: Etiqueta visible o para lectores de pantalla obligatoria */}
                    <label htmlFor="userId" className="sr-only">
                        ID numérico o nombre de usuario
                    </label>
                    <input
                        id="userId"
                        type="text"
                        aria-describedby={helperText ? "search-helper" : undefined}
                        placeholder="ID (1-10) o Nombre..."
                        value={value}
                        onChange={onChange}
                        className={cn(
                            /* UX: Min-height 48px para touch target (Mobile First), Contraste del placeholder mejorado a slate-500 */
                            "w-full min-h-[48px] px-golden-base py-golden-sm bg-white/90 dark:bg-slate-800/90 border-2 rounded-xl transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-500 font-medium outline-none text-golden-p",
                            isError
                                ? "border-red-500 focus:ring-red-500/20"
                                : "border-slate-300 dark:border-slate-600 focus:border-blue-600 dark:focus:border-blue-400",
                        )}
                    />
                </div>
                <button
                    onClick={onSearch}
                    onMouseEnter={onPrefetch}
                    disabled={!value || isLoading || isError}
                    aria-busy={isLoading}
                    className={cn(
                        /* UX: Diseño de alto contraste absoluto (estilo Vercel/Enterprise). Fondo oscuro en modo claro y azul vibrante en modo oscuro. Letras siempre blancas. */
                        "w-full sm:w-auto min-h-[48px] px-8 py-golden-sm bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900 text-golden-p",
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
