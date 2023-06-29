import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "http://192.168.1.17:8080";
const BASE_URL = "https://home-service-vinhome.onrender.com";

const initialState = {
  booking: {},
  loading: false,
  error: null
};

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/v1/booking/create-booking`,
        bookingData,
        {
          headers: { token: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllBooking = createAsyncThunk(
  "booking/getAllBooking",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/v1/booking`, {
        headers: { token: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getBookingByUserId = createAsyncThunk(
  "booking/getBookingByUserId",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/v1/booking/userBooking/${userId}`,
        {
          headers: { token: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  "booking/updateBookingStatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/v1/booking/update/${id}`,
        data,
        {
          headers: { token: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteBookingById = createAsyncThunk(
  "booking/deleteBookingById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/api/v1/booking/delete/${id}`,
        {
          headers: { token: `Bearer ${token}` }
        }
      );
      // return "Success";
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBooking.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.loading = false;
      })
      .addCase(getAllBooking.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getBookingByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingByUserId.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.loading = false;
      })
      .addCase(getBookingByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteBookingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(deleteBookingById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default bookingSlice.reducer;
