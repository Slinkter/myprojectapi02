/**
 * @fileoverview Redux Slice para la gestión del estado global de la Interfaz de Usuario (UI).
 * 
 * @module ui-slice
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {Object} UIState
 */

const initialState = {};

/**
 * Slice para manejar el estado transversal de la UI.
 */
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

export default uiSlice.reducer;
