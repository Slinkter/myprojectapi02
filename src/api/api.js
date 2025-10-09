const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Handles the response from a fetch call.
 * Checks if the response is ok, otherwise throws a structured error.
 * @param {Response} response - The response object from a fetch call.
 * @returns {Promise<any>} A promise that resolves with the JSON body of the response.
 * @throws {Error} Throws an error with a message if the response is not ok.
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        // Try to parse the error body, fall back to status text
        const errorPayload = await response.json().catch(() => null);
        const errorMessage =
            errorPayload?.message ||
            response.statusText ||
            `HTTP error ${response.status}`;
        throw new Error(errorMessage);
    }
    return response.json();
};

/**
 * Fetches data from a specified API endpoint.
 * @param {string} endpoint - The API endpoint to fetch from (e.g., 'users/1').
 * @returns {Promise<any>} A promise that resolves with the data from the API.
 * @throws {Error} Throws an error if the fetch call fails or the response is not ok.
 */
export const fetchFromApi = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return handleResponse(response);
};

/**
 * Fetches a single user by their ID.
 * @param {number|string} userId - The ID of the user to fetch.
 * @returns {Promise<object>} A promise that resolves to a single user object.
 */
export const getUser = (userId) => fetchFromApi(`users/${userId}`);

/**
 * Fetches all posts made by a specific user.
 * @param {number|string} userId - The ID of the user whose posts are to be fetched.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of post objects.
 */
export const getPostsByUser = (userId) =>
    fetchFromApi(`posts?userId=${userId}`);
