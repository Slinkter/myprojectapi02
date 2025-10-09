import { fetchFromApi } from './api';

export const getUsers = () => fetchFromApi('users');

export const getUser = (userId) => fetchFromApi(`users/${userId}`);
