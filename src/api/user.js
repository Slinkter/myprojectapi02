/**
 * @param {number|string} userId - The ID of the user to fetch.
 * @returns {Promise<object>} A promise that resolves to a single user object.
 */

import { fetchFromApi } from "./api";

const getUser = (userId) => {
    return fetchFromApi(`users/${userId}`);
};
export { getUser };
