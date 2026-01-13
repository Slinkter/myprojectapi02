import { fetchFromApi } from "@/lib/api.config";

const getUser = (userId) => {
  return fetchFromApi(`users/${userId}`);
};
export { getUser };
