/**
 * @fileoverview Domain Mappers para Usuarios y Posts.
 * Sanitizan y transforman los datos de infraestructura (API cruda) para proteger
 * la integridad del dominio. Implementan el patrón Defensive Programming
 * asegurando que los componentes UI reciban estructuras de datos consistentes.
 * 
 * @module user-mappers
 */

/**
 * Mapea la respuesta cruda de la API a una entidad de usuario sanitizada.
 * Implementa el patrón Early Return para gestionar entradas nulas o inválidas.
 * Asegura que todas las propiedades tengan un tipo y valor por defecto consistente.
 * 
 * @function mapRawUser
 * @param {Object} raw - Datos crudos recibidos desde JSONPlaceholder.
 * @returns {Object|null} El usuario mapeado con estructura del dominio o `null` si los datos son inválidos.
 * 
 * @example
 * ```javascript
 * const rawApiData = { id: 1, name: "Leanne", ... };
 * const user = mapRawUser(rawApiData);
 * console.log(user.name); // "Leanne"
 * ```
 */
export const mapRawUser = (raw) => {
  // Early Return: Validación mínima necesaria para considerar un usuario válido.
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
 * Transforma una lista de publicaciones crudas en una colección sanitizada.
 * Filtra registros corruptos o incompletos y garantiza que el contenido sea de tipo String.
 * 
 * @function mapRawPosts
 * @param {Array<Object>} rawList - Lista de publicaciones crudas de la API.
 * @returns {Array<Object>} Una lista de publicaciones procesadas y seguras para el dominio.
 * 
 * @example
 * ```javascript
 * const rawPosts = [{ id: 101, title: "Hello World", body: "Content..." }];
 * const cleanPosts = mapRawPosts(rawPosts);
 * ```
 */
export const mapRawPosts = (rawList) => {
  if (!Array.isArray(rawList)) return [];
  
  return rawList
    .filter(p => p && p.id && p.title) // Filtrado defensivo de posts inválidos.
    .map(p => ({
      id: Number(p.id),
      title: String(p.title),
      body: String(p.body || "")
    }));
};
