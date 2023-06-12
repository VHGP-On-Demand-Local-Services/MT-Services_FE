import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice";
import userReducer from "./features/UserSlice";
import ServiceSlice from "./features/ServiceSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        service: ServiceSlice
    }
});

export default store;