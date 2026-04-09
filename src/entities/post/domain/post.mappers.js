import { PostSchema } from "@/shared/lib/schemas/post.schema";
import { validateSchema } from "@/shared/lib/schemas/validation.util";

/**
 * @fileoverview Domain Mappers para Posts.
 * Implementan el patrón Anti-Corruption Layer (ACL) para aislar el dominio
 * de las variaciones de la infraestructura (API).
 * 
 * @module post-mappers
 */

/**
 * @typedef {Object} Post
 * @property {number} id - Identificador único de la publicación.
 * @property {number} userId - Identificador del usuario autor.
 * @property {string} title - Título de la publicación.
 * @property {string} body - Contenido de la publicación.
 */

/**
 * Mapea un objeto de post crudo de la API a una entidad de dominio Post.
 * Valida la estructura mediante PostSchema antes de la transformación.
 * 
 * @function mapPost
 * @param {Object} rawPost - Datos crudos provenientes de la API.
 * @returns {Post|null} Entidad Post validada y mapeada, o null si la validación falla.
 * @throws {Error} No lanza errores, retorna null para fallos de validación (Defensive Programming).
 */
export const mapPost = (rawPost) => {
  const validated = validateSchema(rawPost, PostSchema);

  if (!validated) {
    return null;
  }

  return {
    id: validated.id,
    userId: validated.userId,
    title: validated.title,
    body: validated.body,
  };
};

/**
 * Transforma una colección de publicaciones crudas en una lista de entidades de dominio.
 * Filtra automáticamente cualquier registro que no cumpla con el esquema de validación.
 * 
 * @function mapRawPosts
 * @param {Array<Object>} rawList - Lista de publicaciones crudas de la API.
 * @returns {Post[]} Colección de publicaciones procesadas y seguras para el dominio.
 */
export const mapRawPosts = (rawList) => {
  if (!Array.isArray(rawList)) {
    return [];
  }

  return rawList
    .map(mapPost)
    .filter((post) => post !== null);
};
