import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

// Initialize auth state from localStorage token (if present and valid)
const _storedToken = localStorage.getItem("userToken");
let _userFromToken = null;
let _tokenValid = false;
if (_storedToken) {
  try {
    const _decoded = jwtDecode(_storedToken);
    const _now = Date.now() / 1000;
    if (!_decoded.exp || _decoded.exp > _now) {
      _userFromToken = _decoded;
      _tokenValid = true;
    } else {
      // token expired
      localStorage.removeItem("userToken");
    }
  } catch (e) {
    // invalid token
    localStorage.removeItem("userToken");
  }
}

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );
      const token = response.data.token;

      if (token) {
        // Store token in localStorage
        localStorage.setItem("userToken", token);

        // Decode token to get user info
        const decoded = jwtDecode(token);

        return {
          token,
          user: decoded,
          success: response.data.success,
        };
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const initialState = {
  user: _userFromToken,
  token: _tokenValid ? _storedToken : null,
  isAuthenticated: _tokenValid,
  isLoading: false,
  error: null,
  registerSuccess: false,
  loginSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.registerSuccess = false;
      state.loginSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registerSuccess = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.registerSuccess = false;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.loginSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loginSuccess = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.loginSuccess = false;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
