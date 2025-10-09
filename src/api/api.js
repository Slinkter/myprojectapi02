
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `Error: ${response.status}`);
  }
  return response.json();
};

export const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
};
