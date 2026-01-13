import { fetchFromApi } from "@/lib/api.config";

const getPostsByUser = (userId) => {
  return fetchFromApi(`posts?userId=${userId}`);
};
export { getPostsByUser };
