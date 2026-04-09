import { cn } from "@/shared/lib/utils";
import PropTypes from 'prop-types';

/**
 * Componente contenedor con estilo glassmorphism.
 * Soporta composición de children y clases adicionales.
 *
 * @component
 */
export const Card = ({ children, className, as: Component = "div", ...props }) => (
  <Component 
    className={cn("glass rounded-3xl overflow-hidden shadow-2xl bg-white/40 dark:bg-slate-900/40", className)}
    {...props}
  >
    {children}
  </Component>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

/**
 * Slot de cabecera para componentes Card.
 * @component
 */
export const CardHeader = ({ children, className }) => (
  <div className={cn("p-6 border-b border-slate-200 dark:border-slate-700", className)}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

/**
 * Slot de contenido para componentes Card.
 * @component
 */
export const CardContent = ({ children, className }) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
);

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

/**
 * Slot de pie para componentes Card.
 * @component
 */
export const CardFooter = ({ children, className }) => (
  <div className={cn("p-6 border-t border-slate-200 dark:border-slate-700", className)}>
    {children}
  </div>
);

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
