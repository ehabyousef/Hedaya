import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("userToken");

// Create order - the only available API endpoint (Visa payments only)
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      // Static order data for visa payment only
      const orderData = {
        payment: "visa",
      };

      const res = await axios.post(`${base_url}/order`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // API returns success and results (URL to Stripe) for Visa payments
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    currentOrder: null,
    orderSuccess: false,
  },
  reducers: {
    clearOrderState: (state) => {
      state.error = null;
      state.orderSuccess = false;
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderSuccess = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orderSuccess = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orderSuccess = false;
      });
  },
});

export const { clearOrderState, clearError } = orderSlice.actions;
export default orderSlice.reducer;
