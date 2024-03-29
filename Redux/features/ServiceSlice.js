import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://home-service-vinhome.onrender.com";

export const getAllService = createAsyncThunk(
    "services/getAllServices",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/api/v1/services?page=${page}&limit=${limit}`, {
                headers: { token: `Bearer ${token}` }
            }
            );
            return response.data;
        } catch (err) {
            console.log(err.response.data.message);
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getServiceById = createAsyncThunk(
    "services/getServiceById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/api/v1/services/${id}`, {
                headers: { token: `Bearer ${token}` }
            }
            );
            return response.data;
        } catch (err) {
            console.log(err.response.data.message);
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const createService = createAsyncThunk(
    "services/create-service",
    async (serviceData, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.post(
                `${BASE_URL}/api/v1/services/create-service`,
                serviceData, {
                headers: { token: `Bearer ${token}` }
            }
            );
            return response.data;
        } catch (err) {
            console.log(err.response.data.message);
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const updateService = createAsyncThunk(
    "services/updateService",
    async ({ id, serviceData }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.put(
                `${BASE_URL}/api/v1/services/update/${id}`,
                serviceData, {
                headers: { token: `Bearer ${token}` }
            }
            );
            return response.data;
        } catch (err) {
            console.log(err.response.data.message);
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const deleteService = createAsyncThunk(
    "services/deleteService",
    async ({ id }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.delete(
                `${BASE_URL}/api/v1/services/delete/${id}`, {
                headers: { token: `Bearer ${token}` }
            }
            );
            return response.data;
        } catch (err) {
            console.log(err.response.data.message);
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const searchService = createAsyncThunk(
    "services/searchService",
    async (keyword, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/api/v1/services/search?keyword=${keyword}`,{
                    headers: { token: `Bearer ${token}` }
                }
            );
            return response.data;
        } catch (err) {
            console.log(err.response.data.message);
            return rejectWithValue(err.response.data.message);
        }
    }
);

const initialState = {
    services: {},
    searchServices: {},
    loading: false,
    error: null,
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllService.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllService.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loading = false;
            })
            .addCase(getAllService.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getServiceById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getServiceById.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loading = false;
            })
            .addCase(getServiceById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(createService.pending, (state) => {
                state.loading = true;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(createService.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateService.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateService.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(updateService.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(deleteService.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loading = false;
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(searchService.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchService.fulfilled, (state, action) => {
                state.searchServices = action.payload;
                state.loading = false;
            })
            .addCase(searchService.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { setError } = serviceSlice.actions;
export default serviceSlice.reducer;