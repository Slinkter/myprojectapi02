import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../api/user";
import { getPostsByUser } from "../../api/post";

export const fetchUserAndPosts = createAsyncThunk(
    "user/fetchUserAndPosts",
    async (userId, { rejectWithValue }) => {
        try {
            const [user, posts] = await Promise.all([
                getUser(userId),
                getPostsByUser(userId),
            ]);

            // La API de JSONPlaceholder devuelve {} si no encuentra el usuario.
            // Esta comprobación explícita hace que el thunk sea más robusto.
            if (user && Object.keys(user).length === 0) {
                return { user: null, posts: [] };
            }
            return { user, posts };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        error: null,
        user: null,
        posts: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAndPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserAndPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.posts = action.payload.posts;
            })
            .addCase(fetchUserAndPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.user = null;
                state.posts = [];
            });
    },
});

export default userSlice.reducer;
