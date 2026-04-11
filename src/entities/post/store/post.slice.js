/**
 * @fileoverview
 * Gestión del estado de Publicaciones (Posts).
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPostsByUser } from "@/entities/post/api/post.api";

// --- Async Thunks ---

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

const postSlice = createSlice({
    name: "post",
    initialState: {
        fetchStatus: "idle",
        error: null,
        posts: [],
        currentUserId: null,
    },
    reducers: {
        resetPostState: (state) => {
            state.fetchStatus = "idle";
            state.error = null;
            state.posts = [];
            state.currentUserId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Sync with User Profile fetch (Usando strings para evitar circularidades)
            .addCase("user/fetchById/pending", (state) => {
                state.fetchStatus = "loading";
                state.error = null;
            })
            .addCase("user/fetchById/fulfilled", (state, { payload, meta }) => {
                state.fetchStatus = "succeeded";
                state.posts = payload.posts;
                state.currentUserId = meta.arg;
            })
            .addCase("user/fetchById/rejected", (state, { payload }) => {
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

export const selectPosts = (state) => state.post.posts;
export const selectPostFetchStatus = (state) => state.post.fetchStatus;
export const selectPostFetchError = (state) => state.post.error;
export const selectMemoizedPosts = (state) => state.post.posts ?? [];

export default postSlice.reducer;
