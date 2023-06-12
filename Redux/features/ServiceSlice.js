import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://home-service-vinhome.onrender.com";

export const getAllService = createAsyncThunk(
    "services/getAllServices",
    async({ page, limit }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/api/v1/services?page=${page}&limit=${limit}`, {
                    headers: { token: `Bearer ${token}` }
                }
            );
            return response.data;
        } catch (err) {
            console.log(err.response.data.message)
            return rejectWithValue(err.response.data.message);
        }
    }
)
const initialState = {
    services: {},
    loading: false,
    error: false
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getAllService.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllService.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loading = false
            })
            .addCase(getAllService.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false
            })
    }
})
export default serviceSlice.reducer;