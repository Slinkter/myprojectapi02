import PropTypes from "prop-types";

/**
 * Componente de patrón 'State Boundary' que gestiona centralizadamente los 
 * estados de carga, error y resultados.
 * 
 * @component
 * @category UI Patterns
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
      return Loading ? <Loading /> : <p className="animate-pulse">Cargando...</p>;
    
    case "failed":
      return ErrorComp ? <ErrorComp message={error} /> : <p className="text-red-500">{error}</p>;
    
    case "notFound":
      return NotFound ? <NotFound /> : <p className="text-orange-500">Recurso no encontrado.</p>;
    
    case "succeeded":
      return <>{children}</>;
    
    case "idle":
    default:
      return null;
  }
}

StateBoundary.propTypes = {
  status: PropTypes.oneOf(["idle", "loading", "succeeded", "failed", "notFound"]).isRequired,
  error: PropTypes.string,
  loadingComponent: PropTypes.elementType,
  errorComponent: PropTypes.elementType,
  notFoundComponent: PropTypes.elementType,
  children: PropTypes.node,
};

export default StateBoundary;
