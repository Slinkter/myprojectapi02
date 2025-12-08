/**

* @param {string} endpoint - The API endpoint to fetch from (e.g., 'users/1').
* @throws {Error} Throws an error if the fetch call fails or the response is not ok.
* @returns {Promise<any>} A promise that resolves with the data from the API.
 */

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchFromApi = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
        const errorResponse = await response.json().catch(() => null);
        const message =
            errorResponse?.message ||
            response.statusText ||
            `HTTP error ${response.status}`;

        // Lanza un objeto de error enriquecido con el estado HTTP
        throw { message, status: response.status };
    }
    return response.json();
};
