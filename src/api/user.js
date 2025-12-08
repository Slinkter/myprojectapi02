import { fetchFromApi } from "./api";

const getUser = (userId) => {
    return fetchFromApi(`users/${userId}`);
};
export { getUser };
