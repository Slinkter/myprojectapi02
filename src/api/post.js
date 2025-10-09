import { fetchFromApi } from './api';

/**
 * Fetches all posts made by a specific user.
 * @param {number|string} userId - The ID of the user whose posts are to be fetched.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of post objects.
 */
export const getPostsByUser = (userId) => fetchFromApi(`posts?userId=${userId}`);
