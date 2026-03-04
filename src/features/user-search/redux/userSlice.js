import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfileById, fetchAllUsers } from "../services/user-service";

/**
 * Thunk para obtener un perfil completo (Usuario + Posts) por ID.
 */
export const fetchUserAndPosts = createAsyncThunk(
  "user/fetchById",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchUserProfileById(userId);
    } catch (error) {
      return rejectWithValue({ message: error.message, status: error.status });
    }
  }
);

/**
 * Thunk para cargar todos los usuarios al inicio (Búsqueda por nombre).
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed' | 'notFound'
    error: null,
    user: null,
    posts: [],
    allUsers: [], // Caché de usuarios para búsqueda por nombre
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch por ID
      .addCase(fetchUserAndPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserAndPosts.fulfilled, (state, action) => {
        if (action.payload.user === null) {
          state.status = "notFound";
          state.user = null;
          state.posts = [];
        } else {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.posts = action.payload.posts;
        }
      })
      .addCase(fetchUserAndPosts.rejected, (state, action) => {
        state.status = action.payload?.status === 404 ? "notFound" : "failed";
        state.error = action.payload?.message || "Error desconocido";
        state.user = null;
        state.posts = [];
      })
      // Fetch lista completa
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      });
  },
});

export default userSlice.reducer;
