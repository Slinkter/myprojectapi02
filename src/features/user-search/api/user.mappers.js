/**
 * @fileoverview Domain Mappers para Usuarios y Posts.
 * Sanitizan datos de infraestructura (API) para proteger el dominio.
 * Sigue el patrón Defensive Programming.
 */

/**
 * Mapea la respuesta cruda de la API a una entidad User sanitizada.
 * Aplica el patrón Early Return para casos nulos.
 * 
 * @param {Object} raw - Datos crudos de JSONPlaceholder.
 * @returns {Object|null} Usuario mapeado o null si los datos son inválidos.
 */
export const mapRawUser = (raw) => {
  // Early Return: Validación mínima necesaria.
  if (!raw || typeof raw !== "object" || !raw.id) return null;
  
  return {
    id: Number(raw.id),
    name: String(raw.name || "Unknown User"),
    username: String(raw.username || "guest"),
    email: String(raw.email || ""),
    website: String(raw.website || ""),
    company: {
      name: String(raw.company?.name || "N/A"),
      catchPhrase: String(raw.company?.catchPhrase || "")
    },
    address: {
      street: String(raw.address?.street || ""),
      suite: String(raw.address?.suite || ""),
      city: String(raw.address?.city || ""),
      zipcode: String(raw.address?.zipcode || "")
    }
  };
};

/**
 * Mapea publicaciones crudas a entidades Post sanitizadas.
 * Asegura que solo se incluyan posts con contenido mínimo.
 * 
 * @param {Array<Object>} rawList - Lista de posts de la API.
 * @returns {Array<Object>} Lista sanitizada.
 */
export const mapRawPosts = (rawList) => {
  if (!Array.isArray(rawList)) return [];
  
  return rawList
    .filter(p => p && p.id && p.title) // Solo posts válidos.
    .map(p => ({
      id: Number(p.id),
      title: String(p.title),
      body: String(p.body || "")
    }));
};
