import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { fetchUserProfileById, fetchAllUsers } from "../services/user-service";

/**
 * @fileoverview Redux Slice para la gestión del estado de Usuarios.
 * Sigue Clean Code: Estandarización de nombres y estados predecibles.
 */

// --- Async Thunks ---

/**
 * Thunk para obtener un perfil completo (Usuario + Posts) por ID.
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
 * Thunk para cargar la lista de usuarios (Caché).
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    fetchStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed' | 'notFound'
    error: null,
    profileData: null,
    userPosts: [],
    cachedUserList: [],
  },
  reducers: {
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

const selectUserState = (state) => state.user;

export const selectCurrentUserProfile = createSelector(
  [selectUserState],
  (userState) => userState.profileData
);

export const selectCurrentUserPosts = createSelector(
  [selectUserState],
  (userState) => userState.userPosts
);

export const selectUserFetchStatus = createSelector(
  [selectUserState],
  (userState) => userState.fetchStatus
);

export const selectUserFetchError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

export const selectCachedUsers = createSelector(
  [selectUserState],
  (userState) => userState.cachedUserList
);

export default userSlice.reducer;
