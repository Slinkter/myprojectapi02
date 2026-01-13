import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../services/user-service";

export const fetchUserAndPosts = createAsyncThunk(
  "user/fetchUserAndPosts",
  async (userId, { rejectWithValue }) => {
    try {
      // El thunk ahora solo llama al servicio, que contiene la lógica de negocio.
      const data = await fetchUserProfile(userId);
      return data;
    } catch (error) {
      // Si el servicio lanza un error con estado (como nuestro 404),
      // lo pasamos al reducer a través de rejectWithValue.
      if (error.status) {
        return rejectWithValue({
          message: error.message,
          status: error.status,
        });
      }
      // Para errores genéricos.
      return rejectWithValue({ message: error.message, status: null });
    }
  }
);

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed' | 'notFound'
  error: null,
  user: null,
  posts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAndPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserAndPosts.fulfilled, (state, action) => {
        // Si el servicio devuelve un usuario nulo, es un caso de 'no encontrado'.
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
        // Si la API devolvió un 404, también es un caso de 'no encontrado'.
        if (action.payload?.status === 404) {
          state.status = "notFound";
          state.error = `Usuario no encontrado (Error ${action.payload.status})`;
        } else {
          state.status = "failed";
          state.error = action.payload?.message || "Error desconocido";
        }
        state.user = null;
        state.posts = [];
      });
  },
});

export default userSlice.reducer;
