/**
 * @fileoverview
 * Gestión del estado de Usuarios.
 */

import { createSlice } from "@reduxjs/toolkit";
import { normalizeText } from "@/shared/lib/utils";

const initialState = {
    fetchStatus: "idle",
    listStatus: "idle",
    error: null,
    currentUser: null,
    cachedUsersById: {},
    cachedUsersByUsername: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserState: (state) => {
            state.fetchStatus = "idle";
            state.currentUser = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Perfil Individual (Usando strings para evitar circularidades)
            .addCase("user/fetchById/pending", (state) => {
                state.fetchStatus = "loading";
                state.error = null;
            })
            .addCase("user/fetchById/fulfilled", (state, { payload }) => {
                if (!payload.user) {
                    state.fetchStatus = "notFound";
                    state.currentUser = null;
                    return;
                }
                state.fetchStatus = "succeeded";
                state.currentUser = payload.user;
            })
            .addCase("user/fetchById/rejected", (state, { payload }) => {
                state.fetchStatus =
                    payload?.status === 404 ? "notFound" : "failed";
                state.error = payload?.message || "error.generic";
                state.currentUser = null;
            })
            // Lista de Usuarios
            .addCase("user/fetchList/pending", (state) => {
                state.listStatus = "loading";
            })
            .addCase("user/fetchList/fulfilled", (state, { payload }) => {
                state.listStatus = "succeeded";
                state.cachedUsersById = payload.reduce((acc, user) => {
                    if (user && user.id) acc[user.id] = user;
                    return acc;
                }, {});
                state.cachedUsersByUsername = payload.reduce((acc, user) => {
                    if (user && user.username) acc[normalizeText(user.username)] = user.id;
                    return acc;
                }, {});
            })
            .addCase("user/fetchList/rejected", (state) => {
                state.listStatus = "failed";
                state.cachedUsersById = {};
                state.cachedUsersByUsername = {};
            });
    },
});

export const { resetUserState } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUserFetchStatus = (state) => state.user.fetchStatus;
export const selectUserFetchError = (state) => state.user.error;
export const selectMemoizedUserList = (state) => Object.values(state.user.cachedUsersById || {});
export const selectMemoizedCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
