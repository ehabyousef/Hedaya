import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("userToken");

// Get all cart items
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.get(`${base_url}/cart/allCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.post(`${base_url}/cart/addToCart`, cartData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.delete(`${base_url}/cart/removeFromCart`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      });
      return { product: productId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.put(
        `${base_url}/cart/updateQuantity`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    data: [],
    cartInfo: null, // Store full cart info including totalPrice
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartInfo = action.payload.data; // Store full cart info
        state.data = action.payload.data?.products || []; // Extract products array
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addToCart.pending, (state) => {
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // Refresh cart after adding
        state.data = action.payload.data?.products || [];
        state.cartInfo = action.payload.data;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Remove
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // Refresh cart after removing
        state.data = action.payload.data?.products || [];
        state.cartInfo = action.payload.data;
      })
      // Update quantity
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        // Refresh cart after updating
        state.data = action.payload.data?.products || [];
        state.cartInfo = action.payload.data;
      });
  },
});

export default cartSlice.reducer;
