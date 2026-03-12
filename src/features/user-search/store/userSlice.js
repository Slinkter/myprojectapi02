/**
 * @fileoverview Redux Slice para la gestión del estado de Usuarios.
 * Implementa la lógica de estado para la búsqueda, perfiles y caché de usuarios.
 * Sigue los principios de Redux Toolkit y Clean Code para asegurar estados
 * predecibles y selectores eficientes.
 *
 * @module user-slice
 */

import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from "@reduxjs/toolkit";
import { fetchUserProfileById, fetchAllUsers } from "../services/user-service";

// --- Async Thunks ---

/**
 * Thunk asíncrono para obtener un perfil completo (Usuario + Publicaciones) por su ID.
 * Gestiona errores de infraestructura y propaga mensajes de error localizables.
 *
 * @function fetchUserAndPosts
 * @param {number|string} userId - ID del usuario a recuperar.
 * @param {Object} thunkAPI - API de Redux Toolkit para rejectWithValue.
 * @returns {Promise<Object>} Perfil de usuario y posts.
 */
export const fetchUserAndPosts = createAsyncThunk(
    "user/fetchById",
    async (userId, { rejectWithValue, signal }) => {
        try {
            return await fetchUserProfileById(userId, { signal });
        } catch (error) {
            return rejectWithValue({
                message: error.message || "error.generic",
                status: error.status,
            });
        }
    },

    {
        condition: (userId, { getState }) => {
            const { user } = getState();
            if (user.fetchStatus === "loading") {
                return false;
            }
        },
    },
);

/**
 * Thunk asíncrono para cargar la lista completa de usuarios.
 * Se utiliza principalmente para la funcionalidad de búsqueda local por nombre (caché).
 *
 * @function fetchUsersList
 * @returns {Promise<Array<Object>>} Lista de todos los usuarios sanitizados.
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
 * @property {string} fetchStatus - Estado de la petición individual ('idle', 'loading', 'succeeded', 'failed', 'notFound').
 * @property {string} listStatus - Estado de la petición de lista ('idle', 'loading', 'succeeded', 'failed').
 * @property {string|null} error - Mensaje de error actual o clave de traducción.
 * @property {Object|null} profileData - Datos del perfil del usuario actual.
 * @property {Array<Object>} userPosts - Lista de publicaciones del usuario actual.
 * @property {Array<Object>} cachedUserList - Caché local de todos los usuarios para búsqueda.
 */

const userSlice = createSlice({
    name: "user",
    initialState: {
        // Estado de búsqueda individual
        fetchStatus: "idle",
        error: null,
        profileData: null,
        userPosts: [],
        // Estado de lista/caché (operación separada)
        listStatus: "idle",
        cachedUserList: [],
    },
    reducers: {
        /**
         * Reinicia el estado de búsqueda y perfil a sus valores iniciales.
         * @param {UserState} state - Estado actual del slice.
         */
        resetUserState: (state) => {
            state.fetchStatus = "idle";
            state.profileData = null;
            state.userPosts = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Búsqueda Individual
            .addCase(fetchUserAndPosts.pending, (state) => {
                state.fetchStatus = "loading";
                state.error = null;
                state.profileData = null;
                state.userPosts = [];
            })
            .addCase(fetchUserAndPosts.fulfilled, (state, { payload }) => {
                if (!payload.user) {
                    state.fetchStatus = "notFound";
                    state.profileData = null;
                    state.userPosts = [];
                    return;
                }
                state.fetchStatus = "succeeded";
                state.profileData = payload.user;
                state.userPosts = payload.posts;
            })
            .addCase(fetchUserAndPosts.rejected, (state, { payload }) => {
                state.fetchStatus =
                    payload?.status === 404 ? "notFound" : "failed";
                state.error = payload?.message || "error.generic";
                state.profileData = null;
                state.userPosts = [];
            })
            // Carga de Lista (Caché)
            .addCase(fetchUsersList.pending, (state) => {
                state.listStatus = "loading";
            })
            .addCase(fetchUsersList.fulfilled, (state, { payload }) => {
                state.listStatus = "succeeded";
                state.cachedUserList = payload;
            })
            .addCase(fetchUsersList.rejected, (state) => {
                state.listStatus = "failed";
                state.cachedUserList = []; // Fallo explícito, no silencioso.
            });
    },
});

export const { resetUserState } = userSlice.actions;

// --- Direct Selectors (Optimized) ---

/**
 * Selector directo para los datos del perfil del usuario actual.
 * @param {Object} state - Estado global de Redux.
 */
export const selectCurrentUserProfile = (state) => state.user.profileData;

/**
 * Selector directo para las publicaciones del usuario actual.
 * @param {Object} state - Estado global de Redux.
 */
export const selectCurrentUserPosts = (state) => state.user.userPosts;

/**
 * Selector directo para el estado de la petición individual (status).
 * @param {Object} state - Estado global de Redux.
 */
export const selectUserFetchStatus = (state) => state.user.fetchStatus;

/**
 * Selector directo para el mensaje de error actual.
 * @param {Object} state - Estado global de Redux.
 */
export const selectUserFetchError = (state) => state.user.error;

/**
 * Selector directo para la lista de usuarios en caché.
 * @param {Object} state - Estado global de Redux.
 */
export const selectCachedUsers = (state) => state.user.cachedUserList;

/**
 * Selector memoizado para obtener la lista de usuarios en caché.
 * Utiliza Reselect para evitar cálculos innecesarios si el estado no cambia.
 */
export const selectMemoizedUserList = createSelector(
    [selectCachedUsers],
    (cachedList) => cachedList,
);

export default userSlice.reducer;
