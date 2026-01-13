import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user-search/redux/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
