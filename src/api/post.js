import { fetchFromApi } from './api';

export const getPostsByUser = (userId) => fetchFromApi(`posts?userId=${userId}`);
