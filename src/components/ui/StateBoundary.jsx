/**
 * @fileoverview Implementación del patrón State Boundary.
 * Proporciona un mecanismo declarativo para gestionar transiciones de estado
 * (carga, error, éxito) en la interfaz de usuario.
 * 
 * @module StateBoundary
 */

import { memo } from "react";
import PropTypes from "prop-types";

/**
 * Componente que orquesta el renderizado condicional basado en el estado de una petición.
 * Permite inyectar componentes personalizados para cada estado o utilizar fallbacks.
 * 
 * @component
 */
const StateBoundary = memo(({ 
  status, 
  error, 
  onRetry,
  loadingComponent: Loading, 
  errorComponent: ErrorComp, 
  notFoundComponent: NotFound,
  className,
  children 
}) => {
  switch (status) {
    case "loading":
      return Loading ? <Loading /> : <p className="animate-pulse text-slate-500">Cargando...</p>;
    
    case "failed":
      return ErrorComp ? (
        <ErrorComp message={error} onRetry={onRetry} />
      ) : (
        <p className="text-red-500 font-medium">{error}</p>
      );
    
    case "notFound":
      return NotFound ? <NotFound /> : <p className="text-orange-500 font-medium">Recurso no encontrado.</p>;
    
    case "succeeded":
      return <div className={className}>{children}</div>;
    
    case "idle":
    default:
      return null;
  }
});

StateBoundary.displayName = "StateBoundary";

StateBoundary.propTypes = {
  /** Estado actual de la operación asíncrona. */
  status: PropTypes.oneOf(["idle", "loading", "succeeded", "failed", "notFound"]).isRequired,
  /** Mensaje de error opcional. */
  error: PropTypes.string,
  /** Callback para reintentar una operación fallida. */
  onRetry: PropTypes.func,
  /** Componente (no instancia) para el estado de carga. */
  loadingComponent: PropTypes.elementType,
  /** Componente (no instancia) para el estado de error. */
  errorComponent: PropTypes.elementType,
  /** Componente (no instancia) para el estado no encontrado. */
  notFoundComponent: PropTypes.elementType,
  /** Clase CSS adicional para el contenedor de éxito. */
  className: PropTypes.string,
  /** Contenido para el estado de éxito. */
  children: PropTypes.node,
};

StateBoundary.defaultProps = {
  className: "",
};

export default StateBoundary;
