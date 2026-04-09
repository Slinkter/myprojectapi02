/**
 * @fileoverview Componente Shimmer para efectos de carga premium.
 * Proporciona una capa animada que se desplaza horizontalmente para indicar carga.
 * 
 * @module Shimmer
 */

import { memo } from "react";
import PropTypes from "prop-types";
import { cn } from "@/shared/lib/utils";

/**
 * Renderiza una superposición animada con un gradiente.
 * Debe usarse dentro de un contenedor con `relative` y `overflow-hidden`.
 * 
 * @component
 */
const Shimmer = memo(({ className }) => {
  return (
    <div 
      className={cn(
        "absolute inset-0 animate-loading bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none",
        className
      )} 
    />
  );
});

Shimmer.displayName = "Shimmer";

Shimmer.propTypes = {
  /** Clases de Tailwind adicionales para personalizar el shimmer. */
  className: PropTypes.string,
};

export default Shimmer;
