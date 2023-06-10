import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
  loading: false,
  error: null
};

// const BASE_URL = "http://192.168.2.9:8080";
const BASE_URL = "https://home-service-vinhomes.onrender.com";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/register`,
        userData,
        {
          token: `Bearer ${token}`
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        userData
      );
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_) => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.post(`${BASE_URL}/api/v1/auth/logout`, null, {
      headers: {
        token: `Bearer ${token}`
      }
    });
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.log(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default authSlice.reducer;
