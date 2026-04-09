import { UserSchema } from "@/shared/lib/schemas/user.schema";

/**
 * @typedef {Object} UserDomain
 * @property {number} id
 * @property {string} name
 * @property {string} username
 * @property {string} email
 * @property {string} phone
 * @property {string} website
 * @property {{ name: string, catchPhrase: string }} company
 * @property {{ street: string, suite: string, city: string, zipcode: string }} address
 */

/**
 * @fileoverview Domain Mappers para la entidad Usuario.
 * Actúa como Capa Anti-Corrupción (ACL), transformando datos crudos de la API
 * en modelos de dominio sanitizados y consistentes.
 * 
 * @module user-mappers
 */

/**
 * Mapea la respuesta cruda de la API a una entidad de usuario sanitizada.
 * Garantiza la integridad de los datos mediante Zod y proporciona valores
 * por defecto para evitar estados inconsistentes en la UI.
 * 
 * @function mapRawUser
 * @param {unknown} raw - Datos crudos recibidos de la infraestructura.
 * @returns {UserDomain|null} Entidad de usuario mapeada o null si la validación falla críticamente.
 */
export const mapRawUser = (raw) => {
  console.log("[DEBUG: user-mappers] mapRawUser raw input:", raw);
  if (!raw) return null;
  
  const result = UserSchema.safeParse(raw);
  console.log("[DEBUG: user-mappers] Zod parse success:", result.success);
  if (!result.success) {
    console.error("[DEBUG: user-mappers] Zod parse errors:", result.error.format());
    return null;
  }
  
  const { data } = result;
  
  return {
    id: data.id,
    name: data.name || "Unknown",
    username: data.username || "Unknown",
    email: data.email || "Unknown",
    phone: data.phone || "Unknown",
    website: data.website || "Unknown",
    company: {
      name: data.company?.name || "Unknown",
      catchPhrase: data.company?.catchPhrase || "Unknown",
    },
    address: {
      street: data.address?.street || "Unknown",
      suite: data.address?.suite || "N/A",
      city: data.address?.city || "Unknown",
      zipcode: data.address?.zipcode || "Unknown",
    },
  };
};

/**
 * Mapea una colección de respuestas crudas de la API a entidades de usuario.
 * Filtra cualquier elemento que no pase la validación del esquema.
 * 
 * @function mapRawUsers
 * @param {unknown[]} rawArray - Array de datos crudos recibidos de la infraestructura.
 * @returns {UserDomain[]} Array de usuarios mapeados y sanitizados.
 */
export const mapRawUsers = (rawArray) => {
  if (!Array.isArray(rawArray)) return [];
  
  return rawArray
    .map(mapRawUser)
    .filter((user) => user !== null);
};
