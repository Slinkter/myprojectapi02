import { fetchFromApi } from './api';

/**
 * Fetches a list of all users.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of user objects.
 */
export const getUsers = () => fetchFromApi('users');

/**
 * Fetches a single user by their ID.
 * @param {number|string} userId - The ID of the user to fetch.
 * @returns {Promise<object>} A promise that resolves to a single user object.
 */
export const getUser = (userId) => fetchFromApi(`users/${userId}`);
