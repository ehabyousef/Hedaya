// allProducts slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const base_url = process.env.REACT_APP_BASE_URL;
const getToken = () => localStorage.getItem("userToken");

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
  async ({ categoryId, subCategoryId, sort }) => {
    try {
      let url = `${base_url}/products/filter?`;
      const params = new URLSearchParams();

      if (categoryId) {
        params.append("categoryId", categoryId);
      }
      if (subCategoryId) {
        params.append("subCategoryId", subCategoryId);
      }
      if (sort) {
        params.append("sort", sort);
      }
      // params.append("status", "new");
      const res = await axios.get(`${url}${params.toString()}`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

// Create product (multipart/form-data)
export const createProduct = createAsyncThunk(
  "allProducts/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.post(`${base_url}/products`, formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete product by id
export const deleteProduct = createAsyncThunk(
  "allProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.delete(`${base_url}/products/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { id, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get single product by id
export const fetchProductById = createAsyncThunk(
  "allProducts/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url}/products/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update product by id (multipart/form-data via PATCH)
export const updateProduct = createAsyncThunk(
  "allProducts/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.patch(`${base_url}/products/${id}`, formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get related products by subCategory
export const fetchRelatedProducts = createAsyncThunk(
  "allProducts/fetchRelatedProducts",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      if (!subCategoryId) return [];
      const res = await axios.get(
        `${base_url}/products?subCategory=${subCategoryId}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
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
    currentProduct: null,
    currentProductLoading: false,
    currentProductError: null,
    relatedProducts: [],
    relatedLoading: false,
    relatedError: null,
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
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        const created = action.payload?.data || action.payload;
        if (created && (created.id || created._id)) {
          state.data.unshift(created);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.data = state.data.filter((p) => p.id !== id && p._id !== id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.currentProductLoading = true;
        state.currentProductError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProductLoading = false;
        state.currentProduct = action.payload?.data || action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentProductLoading = false;
        state.currentProductError = action.payload || action.error.message;
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload?.data || action.payload;
        if (updated && (updated._id || updated.id)) {
          const uid = updated._id || updated.id;
          const idx = state.data.findIndex((p) => (p._id || p.id) === uid);
          if (idx !== -1) state.data[idx] = updated;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // Related products by subCategory
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.relatedLoading = true;
        state.relatedError = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedLoading = false;
        state.relatedProducts = action.payload?.result || action.payload || [];
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.relatedLoading = false;
        state.relatedError = action.payload || action.error.message;
      });
  },
});

export const { setActiveFilter, clearError } = allProductsSlice.actions;

export default allProductsSlice.reducer;
