/**
 * @fileoverview Componente visual para estados "No Encontrado" (404).
 * Especializado en mostrar feedback claro cuando una búsqueda no arroja resultados.
 *
 * @module NotFoundCard
 */

import { memo } from "react";
import PropTypes from "prop-types";
import { cn } from "@/shared/lib/utils";

/**
 * Muestra una tarjeta informativa cuando un recurso no existe.
 * Es un componente puramente presentacional (Dumb Component).
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string|number} [props.attemptedId] - El identificador o término de búsqueda que no obtuvo resultados.
 * @param {string} [props.className] - Clases de Tailwind adicionales para el contenedor.
 * @returns {JSX.Element} El componente de tarjeta no encontrado.
 */
const NotFoundCard = memo(({ attemptedId, className }) => {
    return (
        <div 
            className={cn(
                "glass rounded-3xl p-10 text-center animate-in fade-in zoom-in-95 duration-300 ease-out",
                className
            )}
            role="status"
            aria-live="polite"
        >
            <div 
                className={cn("w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6")}
                aria-hidden="true"
            >
                <span className={cn("text-5xl")}>🔍</span>
            </div>
            <h3 className={cn("text-2xl font-bold text-slate-900 dark:text-white mb-4")}>
                Recurso no encontrado
            </h3>
            <p className={cn("text-slate-600 dark:text-slate-400 mb-2 leading-relaxed")}>
                No pudimos encontrar ningún resultado asociado a <span className={cn("font-bold text-blue-600 dark:text-blue-400")}>&quot;{attemptedId}&quot;</span>.
            </p>
            <p className={cn("text-sm text-slate-500 dark:text-slate-500 italic")}>
                Por favor, verifica los datos ingresados e intenta nuevamente.
            </p>
        </div>
    );
});

NotFoundCard.displayName = "NotFoundCard";

NotFoundCard.propTypes = {
    /** El identificador o término de búsqueda que no obtuvo resultados. */
    attemptedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Clases de Tailwind adicionales para el contenedor. */
    className: PropTypes.string,
};

export default NotFoundCard;
