import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user-search/redux/userSlice";
import uiReducer from "./uiSlice";

/**
 * Configuración del store global de Redux.
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
  },
});
