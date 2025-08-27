import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

// Get all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url}/categories`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add a new category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url}/categories`, categoryData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update a category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, updateData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${base_url}/categories/${categoryId}`,
        updateData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete a category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${base_url}/categories/${categoryId}`);
      return categoryId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      // Update
      .addCase(updateCategory.fulfilled, (state, action) => {
        const idx = state.data.findIndex(
          (cat) => cat._id === action.payload._id
        );
        if (idx !== -1) state.data[idx] = action.payload;
      })
      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter((cat) => cat._id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
