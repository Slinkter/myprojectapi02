/**
 * @fileoverview Implementación del patrón State Boundary.
 * Proporciona un mecanismo declarativo para gestionar transiciones de estado
 * (carga, error, éxito) en la interfaz de usuario.
 * 
 * @module StateBoundary
 */

import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Componente que orquesta el renderizado condicional basado en el estado de una petición.
 * Permite inyectar componentes personalizados para cada estado o utilizar fallbacks.
 * 
 * @component
 * @category UI Patterns
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.status - Estado actual de la lógica de negocio ('idle', 'loading', 'succeeded', 'failed', 'notFound').
 * @param {string} [props.error] - Mensaje de error para pasar al componente de error.
 * @param {React.ElementType} [props.loadingComponent] - Componente a renderizar durante la carga.
 * @param {React.ElementType} [props.errorComponent] - Componente a renderizar en caso de fallo.
 * @param {React.ElementType} [props.notFoundComponent] - Componente a renderizar si el recurso no existe.
 * @param {React.ReactNode} props.children - Contenido a mostrar cuando el estado es 'succeeded'.
 * 
 * @returns {JSX.Element|null} El componente correspondiente al estado actual.
 * 
 * @example
 * ```tsx
 * <StateBoundary 
 *   status={status} 
 *   loadingComponent={MySkeleton}
 *   errorComponent={ErrorMessage}
 * >
 *   <DataView data={data} />
 * </StateBoundary>
 * ```
 */
function StateBoundary({ 
  status, 
  error, 
  loadingComponent: Loading, 
  errorComponent: ErrorComp, 
  notFoundComponent: NotFound,
  children 
}) {
  switch (status) {
    case "loading":
      return Loading ? <Loading /> : <p className={cn("animate-pulse")}>Cargando...</p>;
    
    case "failed":
      return ErrorComp ? <ErrorComp message={error} /> : <p className={cn("text-red-500")}>{error}</p>;
    
    case "notFound":
      return NotFound ? <NotFound /> : <p className={cn("text-orange-500")}>Recurso no encontrado.</p>;
    
    case "succeeded":
      return <>{children}</>;
    
    case "idle":
    default:
      return null;
  }
}

StateBoundary.propTypes = {
  /** Estado actual de la operación asíncrona. */
  status: PropTypes.oneOf(["idle", "loading", "succeeded", "failed", "notFound"]).isRequired,
  /** Mensaje de error opcional. */
  error: PropTypes.string,
  /** Componente (no instancia) para el estado de carga. */
  loadingComponent: PropTypes.elementType,
  /** Componente (no instancia) para el estado de error. */
  errorComponent: PropTypes.elementType,
  /** Componente (no instancia) para el estado no encontrado. */
  notFoundComponent: PropTypes.elementType,
  /** Contenido para el estado de éxito. */
  children: PropTypes.node,
};

export default StateBoundary;
