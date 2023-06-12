import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: {},
    loading: false,
    error: false
};

const BASE_URL = "https://home-service-vinhome.onrender.com";

export const getAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async({ page, limit }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/api/v1/users?page=${page}&limit=${limit}`, {
                    headers: { token: `Bearer ${token}` }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getUserById = createAsyncThunk(
    "users/getUserById",
    async({ id }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/api/v1/users/${id}`, {
                headers: { token: `Bearer ${token}` }
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateUserById = createAsyncThunk(
    "users/updateUserById",
    async({ id, userData }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.put(
                `${BASE_URL}/api/v1/users/update-info/${id}`,
                userData, {
                    headers: { token: `Bearer ${token}` }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const deleteUserById = createAsyncThunk(
    "users/deleteUserById",
    async({ id }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.delete(
                `${BASE_URL}/api/v1/users/delete-user/${id}`, {
                    headers: { token: `Bearer ${token}` }
                }
            );
            // console.log(response.data);
            // return response.data;
        } catch (error) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(deleteUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default userSlice.reducer;