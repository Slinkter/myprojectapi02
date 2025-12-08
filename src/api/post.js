import { fetchFromApi } from "./api";

const getPostsByUser = (userId) => {
    return fetchFromApi(`posts?userId=${userId}`);
};
export { getPostsByUser };
