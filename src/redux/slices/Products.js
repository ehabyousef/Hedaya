// allProducts slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const base_url = process.env.REACT_APP_BASE_URL;

export const fetchAllProducts = createAsyncThunk(
  "allProducts/fetchProducts",
  async (sort) => {
    try {
      const res = await axios.get(`${base_url}/products`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err; // Rethrow the error to be caught by the component
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "allProducts/fetchFilteredProducts",
  async ({ categoryId, subCategoryId }) => {
    try {
      let url = `${base_url}/products/filter?`;
      const params = new URLSearchParams();

      if (categoryId) {
        params.append("categoryId", categoryId);
      }
      if (subCategoryId) {
        params.append("subCategoryId", subCategoryId);
      }
      params.append("status", "new");
      const res = await axios.get(`${url}${params.toString()}`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    loading: false,
    error: null,
    data: [],
    filterd: [],
    activeFilter: null,
  },
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.activeFilter = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch filtered products
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filterd = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setActiveFilter, clearError } = allProductsSlice.actions;

export default allProductsSlice.reducer;
