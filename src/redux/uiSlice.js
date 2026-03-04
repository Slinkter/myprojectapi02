import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: localStorage.getItem("language") || "es",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
