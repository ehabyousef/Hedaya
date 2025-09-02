import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

const getToken = () => localStorage.getItem("userToken");

// GET all users
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.get(`${base_url}/users`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE user by id
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.put(`${base_url}/users/${id}`, data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data; // expects { message, result, token? }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE user by id
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.delete(`${base_url}/users/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { id, ...res.data }; // expects { message }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    data: [],
    lastUpdatedId: null,
  },
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updated = action.payload?.result || action.payload;
        state.lastUpdatedId = updated?._id || null;
        if (updated?._id) {
          const idx = state.data.findIndex((u) => u._id === updated._id);
          if (idx !== -1) state.data[idx] = updated;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.data = state.data.filter((u) => u._id !== id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;
