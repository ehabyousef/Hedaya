import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

// Get all subcategories
export const fetchSubcategories = createAsyncThunk(
  "subcategories/fetchSubcategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url}/subcategories`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add a new subcategory
export const addSubcategory = createAsyncThunk(
  "subcategories/addSubcategory",
  async (subcategoryData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${base_url}/subcategories`,
        subcategoryData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update a subcategory
export const updateSubcategory = createAsyncThunk(
  "subcategories/updateSubcategory",
  async ({ subcategoryId, updateData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${base_url}/subcategories/${subcategoryId}`,
        updateData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete a subcategory
export const deleteSubcategory = createAsyncThunk(
  "subcategories/deleteSubcategory",
  async (subcategoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${base_url}/subcategories/${subcategoryId}`);
      return subcategoryId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addSubcategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      // Update
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        const idx = state.data.findIndex(
          (sub) => sub._id === action.payload._id
        );
        if (idx !== -1) state.data[idx] = action.payload;
      })
      // Delete
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.data = state.data.filter((sub) => sub._id !== action.payload);
      });
  },
});

export default subcategoriesSlice.reducer;
