import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice";
import userReducer from "./features/UserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  }
});

export default store;
