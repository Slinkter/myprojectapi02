/**
 * @fileoverview Componente visual para estados "No Encontrado" (404).
 * Especializado en mostrar feedback claro cuando una búsqueda de usuario
 * no arroja resultados en la API o caché.
 * 
 * @module NotFoundCard
 */

import { memo } from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Muestra una tarjeta informativa cuando un perfil de usuario no existe.
 * Proporciona contexto sobre el término de búsqueda que falló.
 * 
 * @component
 */
const NotFoundCard = memo(({ attemptedId }) => {
  return (
    <div className={cn(
      "bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-500"
    )}>
      <div className={cn("w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6")}>
        <span className={cn("text-5xl")}>🔍</span>
      </div>
      <h3 className={cn("text-2xl font-bold text-slate-900 dark:text-white mb-4")}>
        Usuario no encontrado
      </h3>
      <p className={cn("text-slate-600 dark:text-slate-400 mb-2")}>
        No pudimos encontrar ningún perfil asociado a <span className={cn("font-bold text-blue-600 dark:text-blue-400")}>&quot;{attemptedId}&quot;</span>.
      </p>
      <p className={cn("text-sm text-slate-500 dark:text-slate-500 italic")}>
        Busca por ID numérico (1-10) o nombre de usuario.
      </p>
    </div>
  );
});

NotFoundCard.displayName = "NotFoundCard";

NotFoundCard.propTypes = {
  /** El identificador o término de búsqueda que no obtuvo resultados. */
  attemptedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NotFoundCard;
