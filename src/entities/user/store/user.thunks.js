import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchUserProfileById,
    fetchAllUsers,
} from "@/entities/user/services/user-service";
import { resolveSearchQuery } from "@/entities/user/domain/search-engine";

/**
 * Thunk asíncrono para obtener un perfil completo (Usuario + Publicaciones) basándose
 * en una consulta de búsqueda (ID o nombre de usuario).
 *
 * @function fetchUserAndPosts
 */
export const fetchUserAndPosts = createAsyncThunk(
    "user/fetchById",
    async (searchQuery, { rejectWithValue, signal, getState }) => {
        const { user } = getState();
        const resolvedId = resolveSearchQuery(searchQuery, user.cachedUsersByUsername);

        if (!resolvedId) {
            return rejectWithValue({
                status: 404,
                message: "user.notFoundTitle",
            });
        }

        try {
            return await fetchUserProfileById(resolvedId, { signal });
        } catch (error) {
            return rejectWithValue({
                message: error.message || "error.generic",
                status: error.status,
            });
        }
    },
    {
        condition: (searchQuery, { getState }) => {
            const { user } = getState();
            if (user.fetchStatus === "loading") return false;
        },
    },
);

/**
 * Thunk asíncrono para cargar la lista completa de usuarios en la caché local.
 *
 * @function fetchUsersList
 */
export const fetchUsersList = createAsyncThunk(
    "user/fetchList",
    async (_, { rejectWithValue, signal }) => {
        try {
            return await fetchAllUsers({ signal });
        } catch (error) {
            return rejectWithValue({
                message: error.message || "error.list.generic",
                status: error.status || 500,
            });
        }
    },
);
