/**
 * Fetches data from a specified API endpoint and handles the response.
 * @param {string} endpoint - The API endpoint to fetch from (e.g., 'users/1').
 * @returns {Promise<any>} A promise that resolves with the data from the API.
 * @throws {Error} Throws an error if the fetch call fails or the response is not ok.
 */

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchFromApi = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
        const errorResponse = await response.json().catch(() => null);
        const msj =
            errorResponse?.message ||
            response.statusText ||
            `HTTP error ${response.status}`;

        throw new Error(msj);
    }
    return response.json();
};
