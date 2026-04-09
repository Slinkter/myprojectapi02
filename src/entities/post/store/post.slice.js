/**
 * @fileoverview
 * Gestión del estado de Publicaciones (Posts).
 * Implementa la lógica de estado para la carga y almacenamiento de posts por usuario.
 *
 * @module post-slice
 */

import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getPostsByUser } from "@/entities/post/api/post.api";
import { fetchUserAndPosts } from "@/entities/user/store/userSlice";

// --- Async Thunks ---

/**
 * Thunk asíncrono para obtener las publicaciones de un usuario específico.
 * Propaga la señal de aborto y gestiona errores de infraestructura.
 *
 * @function fetchPostsByUser
 * @param {number|string} userId - ID del usuario cuyas publicaciones se desean recuperar.
 * @param {Object} thunkAPI - API de Redux Toolkit para rejectWithValue.
 * @returns {Promise<Array<Object>>} Lista de posts crudos.
 */
export const fetchPostsByUser = createAsyncThunk(
    "post/fetchByUser",
    async (userId, { rejectWithValue, signal }) => {
        try {
            return await getPostsByUser(userId, { signal });
        } catch (error) {
            return rejectWithValue({
                message: error.message || "error.posts.generic",
                status: error.status || 500,
            });
        }
    },
    {
        condition: (userId, { getState }) => {
            const { post } = getState();
            if (post.fetchStatus === "loading") {
                return false;
            }
        },
    }
);

// --- Slice Definition ---

/**
 * @typedef {Object} PostState
 * @property {string} fetchStatus - Estado de la petición ('idle', 'loading', 'succeeded', 'failed').
 * @property {string|null} error - Mensaje de error actual o clave de traducción.
 * @property {Array<Object>} posts - Lista de publicaciones almacenadas.
 * @property {number|string|null} currentUserId - ID del usuario al que pertenecen los posts actuales.
 */

const postSlice = createSlice({
    name: "post",
    initialState: {
        fetchStatus: "idle",
        error: null,
        posts: [],
        currentUserId: null,
    },
    reducers: {
        /**
         * Reinicia el estado de las publicaciones a sus valores iniciales.
         * @param {PostState} state - Estado actual del slice.
         */
        resetPostState: (state) => {
            state.fetchStatus = "idle";
            state.error = null;
            state.posts = [];
            state.currentUserId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Sync with User Profile fetch
            .addCase(fetchUserAndPosts.pending, (state) => {
                state.fetchStatus = "loading";
                state.error = null;
            })
            .addCase(fetchUserAndPosts.fulfilled, (state, { payload, meta }) => {
                state.fetchStatus = "succeeded";
                state.posts = payload.posts;
                state.currentUserId = meta.arg;
            })
            .addCase(fetchUserAndPosts.rejected, (state, { payload }) => {
                state.fetchStatus = "failed";
                state.error = payload?.message || "error.posts.generic";
                state.posts = [];
            })
            // Standalone Post fetch
            .addCase(fetchPostsByUser.pending, (state) => {
                state.fetchStatus = "loading";
                state.error = null;
            })
            .addCase(fetchPostsByUser.fulfilled, (state, { payload, meta }) => {
                state.fetchStatus = "succeeded";
                state.posts = payload;
                // Extraemos el userId del argumento del thunk desde meta.arg
                state.currentUserId = meta.arg;
            })
            .addCase(fetchPostsByUser.rejected, (state, { payload }) => {
                state.fetchStatus = "failed";
                state.error = payload?.message || "error.posts.generic";
                state.posts = [];
            });
    },
});

export const { resetPostState } = postSlice.actions;

// --- Selectors ---

/**
 * Selector para obtener la lista de publicaciones almacenadas.
 * @param {Object} state - Estado global de Redux.
 */
export const selectPosts = (state) => state.post.posts;

/**
 * Selector para obtener el estado de la petición de posts.
 * @param {Object} state - Estado global de Redux.
 */
export const selectPostFetchStatus = (state) => state.post.fetchStatus;

/**
 * Selector para obtener el mensaje de error de la petición de posts.
 * @param {Object} state - Estado global de Redux.
 */
export const selectPostFetchError = (state) => state.post.error;

/**
 * Selector memoizado para obtener la lista de publicaciones.
 * Asegura que se devuelva siempre un array, evitando errores de renderizado.
 */
export const selectMemoizedPosts = createSelector(
    [selectPosts],
    (posts) => posts ?? [],
);

export default postSlice.reducer;
