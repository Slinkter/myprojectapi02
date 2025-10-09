import { fetchFromApi } from "./api";

/**
 * Fetches a single user by their ID.
 * @param {number|string} userId - The ID of the user to fetch.
 * @returns {Promise<object>} A promise that resolves to a single user object.
 */
const getUser = (userId) => fetchFromApi(`users/${userId}`);
export { getUser };
