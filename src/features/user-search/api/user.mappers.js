/**
 * @fileoverview Mapeadores de datos para transformar las respuestas de la API
 * externa en entidades de dominio limpias y predecibles.
 * 
 * @module UserMappers
 * @category Data Layer
 */

/**
 * Mapea la respuesta cruda de la API a un objeto User limpio.
 * 
 * @param {Object} rawUser - Datos provenientes de JSONPlaceholder.
 * @returns {Object} Usuario mapeado con solo los campos necesarios.
 */
export const mapRawUser = (rawUser) => {
  if (!rawUser || Object.keys(rawUser).length === 0) return null;
  
  return {
    id: rawUser.id,
    name: rawUser.name,
    username: rawUser.username,
    email: rawUser.email,
    website: rawUser.website,
    company: {
      name: rawUser.company?.name || "N/A",
      catchPhrase: rawUser.company?.catchPhrase || ""
    },
    address: {
      street: rawUser.address?.street || "",
      suite: rawUser.address?.suite || "",
      city: rawUser.address?.city || "",
      zipcode: rawUser.address?.zipcode || ""
    }
  };
};

/**
 * Mapea una lista de publicaciones crudas a una lista de objetos Post limpios.
 * 
 * @param {Array<Object>} rawPosts - Lista de posts de la API.
 * @returns {Array<Object>} Lista de posts mapeada.
 */
export const mapRawPosts = (rawPosts) => {
  if (!Array.isArray(rawPosts)) return [];
  
  return rawPosts.map(post => ({
    id: post.id,
    title: post.title,
    body: post.body
  }));
};
