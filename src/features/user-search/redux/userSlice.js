/**
 * @fileoverview Redux Slice para la gestión del estado de Usuarios.
 * Implementa la lógica de estado para la búsqueda, perfiles y caché de usuarios.
 * Sigue los principios de Redux Toolkit y Clean Code para asegurar estados
 * predecibles y selectores eficientes.
 * 
 * @module user-slice
 */

import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
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
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchUserProfileById(userId);
    } catch (error) {
      return rejectWithValue({ 
        message: error.message || "error.generic", 
        status: error.status 
      });
    }
  }
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
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllUsers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Slice Definition ---

/**
 * @typedef {Object} UserState
 * @property {string} fetchStatus - Estado actual de la petición ('idle', 'loading', 'succeeded', 'failed', 'notFound').
 * @property {string|null} error - Mensaje de error actual o clave de traducción.
 * @property {Object|null} profileData - Datos del perfil del usuario actual.
 * @property {Array<Object>} userPosts - Lista de publicaciones del usuario actual.
 * @property {Array<Object>} cachedUserList - Caché local de todos los usuarios para búsqueda.
 */

const userSlice = createSlice({
  name: "user",
  initialState: {
    fetchStatus: "idle", 
    error: null,
    profileData: null,
    userPosts: [],
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAndPosts.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
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
        state.fetchStatus = payload?.status === 404 ? "notFound" : "failed";
        state.error = payload?.message || "error.generic";
        state.profileData = null;
        state.userPosts = [];
      })
      .addCase(fetchUsersList.fulfilled, (state, { payload }) => {
        state.cachedUserList = payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;

// --- Memoized Selectors ---

/**
 * Selector base para obtener el estado de usuarios.
 * @private
 */
const selectUserState = (state) => state.user;

/**
 * Selector memorizado para los datos del perfil del usuario actual.
 * @type {Function}
 */
export const selectCurrentUserProfile = createSelector(
  [selectUserState],
  (userState) => userState.profileData
);

/**
 * Selector memorizado para las publicaciones del usuario actual.
 * @type {Function}
 */
export const selectCurrentUserPosts = createSelector(
  [selectUserState],
  (userState) => userState.userPosts
);

/**
 * Selector memorizado para el estado de la petición (status).
 * @type {Function}
 */
export const selectUserFetchStatus = createSelector(
  [selectUserState],
  (userState) => userState.fetchStatus
);

/**
 * Selector memorizado para el mensaje de error actual.
 * @type {Function}
 */
export const selectUserFetchError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

/**
 * Selector memorizado para la lista de usuarios en caché.
 * @type {Function}
 */
export const selectCachedUsers = createSelector(
  [selectUserState],
  (userState) => userState.cachedUserList
);

export default userSlice.reducer;
