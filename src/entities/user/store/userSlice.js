/**
 * @fileoverview
 * Gestión del estado de Usuarios.
 * Implementa la lógica de estado para la búsqueda, perfiles y caché de usuarios
 * siguiendo una máquina de estados estricta para el control de flujo de la UI.
 *
 * @module user-slice
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchUserProfileById,
    fetchAllUsers,
} from "@/entities/user/services/user-service";
import { resolveSearchQuery } from "@/features/user-search/services/search-engine";

/**
 * Estados posibles para las peticiones de usuario.
 * @typedef {"idle" | "loading" | "succeeded" | "failed" | "notFound"} FetchStatus
 */

// --- Async Thunks ---

/**
 * Thunk asíncrono para obtener un perfil completo (Usuario + Publicaciones) basándose
 * en una consulta de búsqueda (ID o nombre de usuario).
 * Propaga la señal de AbortController para evitar race conditions en navegaciones rápidas.
 *
 * @function fetchUserAndPosts
 * @param {number|string} searchQuery - ID o nombre de usuario a recuperar.
 * @returns {Promise<Object>} Perfil de usuario y posts.
 */
export const fetchUserAndPosts = createAsyncThunk(
    "user/fetchById",
    async (searchQuery, { rejectWithValue, signal, getState }) => {
        const { user } = getState();
        const resolvedId = resolveSearchQuery(searchQuery, user.cachedUserList);

        if (!resolvedId) {
            return rejectWithValue({
                status: 404,
                message: "user.notFoundTitle",
            });
        }

        try {
            // Propagamos el signal al servicio para permitir la cancelación de la petición HTTP
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
            // Evitamos peticiones duplicadas si ya estamos cargando
            if (user.fetchStatus === "loading") return false;
        },
    },
);

/**
 * Thunk asíncrono para cargar la lista completa de usuarios en la caché local.
 *
 * @function fetchUsersList
 * @returns {Promise<Array<Object>>} Lista de usuarios sanitizados.
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

// --- Slice Definition ---

/**
 * @typedef {Object} UserState
 * @property {FetchStatus} fetchStatus - Estado de la petición del perfil actual.
 * @property {FetchStatus} listStatus - Estado de la petición de la lista de usuarios.
 * @property {string|null} error - Mensaje de error o clave de traducción.
 * @property {Object|null} currentUser - Entidad del usuario actual mapeada al dominio.
 * @property {Array<Object>} cachedUserList - Caché de usuarios para búsqueda instantánea.
 */

const initialState = {
    fetchStatus: "idle",
    listStatus: "idle",
    error: null,
    currentUser: null,
    cachedUserList: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /**
         * Reinicia el estado del perfil al valor inicial.
         * @param {UserState} state
         */
        resetUserState: (state) => {
            state.fetchStatus = "idle";
            state.currentUser = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Perfil Individual
            .addCase(fetchUserAndPosts.pending, (state) => {
                state.fetchStatus = "loading";
                state.error = null;
            })
            .addCase(fetchUserAndPosts.fulfilled, (state, { payload }) => {
                if (!payload.user) {
                    state.fetchStatus = "notFound";
                    state.currentUser = null;
                    return;
                }
                state.fetchStatus = "succeeded";
                state.currentUser = payload.user;
            })
            .addCase(fetchUserAndPosts.rejected, (state, { payload }) => {
                state.fetchStatus =
                    payload?.status === 404 ? "notFound" : "failed";
                state.error = payload?.message || "error.generic";
                state.currentUser = null;
            })
            // Lista de Usuarios
            .addCase(fetchUsersList.pending, (state) => {
                state.listStatus = "loading";
            })
            .addCase(fetchUsersList.fulfilled, (state, { payload }) => {
                state.listStatus = "succeeded";
                state.cachedUserList = payload;
            })
            .addCase(fetchUsersList.rejected, (state) => {
                state.listStatus = "failed";
                state.cachedUserList = [];
            });
    },
});

export const { resetUserState } = userSlice.actions;

// --- Selectors ---

/**
 * Selector para el usuario actual.
 */
export const selectCurrentUser = (state) => state.user.currentUser;

/**
 * Selector para el estado de carga del usuario.
 */
export const selectUserFetchStatus = (state) => state.user.fetchStatus;

/**
 * Selector para el error de carga del usuario.
 */
export const selectUserFetchError = (state) => state.user.error;

/**
 * Selector memoizado para la lista de usuarios.
 * Garantiza que la UI no se re-renderice a menos que la lista cambie realmente.
 */
export const selectMemoizedUserList = (state) => state.user.cachedUserList ?? [];
 
/**
 * Selector memoizado para el perfil del usuario actual.
 */
export const selectMemoizedCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
