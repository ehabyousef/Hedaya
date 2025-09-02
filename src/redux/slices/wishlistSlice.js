import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

// Async thunk for fetching wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(`${API_BASE_URL}/products/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

// Async thunk for adding to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `${API_BASE_URL}/products/wishlist/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);

// Async thunk for removing from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.delete(
        `${API_BASE_URL}/products/wishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Return response along with productId for optimistic updates
      return { productId, ...(response?.data || {}) };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist cases
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle different API response structures
        const responseData = action.payload;
        if (responseData?.result && Array.isArray(responseData.result)) {
          // API shape: { status, count, result: [{ product: {...} }, ...] }
          state.items = responseData.result.map((it) => it.product || it);
        } else if (Array.isArray(responseData)) {
          state.items = responseData;
        } else if (responseData?.data && Array.isArray(responseData.data)) {
          state.items = responseData.data;
        } else if (
          responseData?.results &&
          Array.isArray(responseData.results)
        ) {
          state.items = responseData.results;
        } else if (
          responseData?.data?.result &&
          Array.isArray(responseData.data.result)
        ) {
          state.items = responseData.data.result.map((it) => it.product || it);
        } else {
          state.items = [];
        }
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add to wishlist cases
      .addCase(addToWishlist.pending, (state) => {
        // Do not block the whole page for mutations
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        // Optimistically add item to wishlist
        const newItem = action.payload?.data || action.payload;
        if (
          newItem &&
          !state.items.some(
            (item) => item._id === newItem._id || item.id === newItem.id
          )
        ) {
          state.items.push(newItem);
        }
        state.error = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove from wishlist cases
      .addCase(removeFromWishlist.pending, (state) => {
        // Do not block the whole page for mutations
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        // Optimistically update items without forcing a full refetch
        const removedId = action.payload?.productId;
        if (removedId) {
          state.items = (state.items || []).filter(
            (it) =>
              it._id !== removedId &&
              it.id !== removedId &&
              it.product?._id !== removedId &&
              it.product?.id !== removedId
          );
        }
        state.error = null;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
