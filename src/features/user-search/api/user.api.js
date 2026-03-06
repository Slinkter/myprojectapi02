import { fetchFromApi } from "@/lib/api-client";

/**
 * @fileoverview Adaptador de Infraestructura para Usuarios.
 * Aísla el dominio de la comunicación con el endpoint de usuarios.
 */

/**
 * Obtiene un usuario por ID.
 * Implementa Early Return para errores controlados (404).
 * 
 * @async
 * @param {number|string} id - ID del usuario.
 * @returns {Promise<Object>} Datos del usuario o vacío si no existe.
 */
export const getUser = async (id) => {
  if (!id) return {};

  try {
    return await fetchFromApi(`users/${id}`);
  } catch (error) {
    // Si es un 404, retornamos objeto vacío de forma segura para la capa de servicios.
    if (error.status === 404) return {};
    throw error;
  }
};

/**
 * Obtiene todos los usuarios disponibles.
 * 
 * @async
 * @returns {Promise<Array<Object>>} Lista completa de usuarios.
 */
export const getAllUsers = async () => {
  try {
    const users = await fetchFromApi("users");
    return Array.isArray(users) ? users : [];
  } catch (error) {
    // Error silencioso para la lista completa para no bloquear la app.
    console.error("Critical Error fetching all users:", error);
    return [];
  }
};
