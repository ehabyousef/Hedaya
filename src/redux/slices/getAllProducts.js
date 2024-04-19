// allProducts slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
    "allProducts/fetchProducts",
    async (sort) => {
        try {
            const res = await axios.get(`https://backend-kappa-beige.vercel.app/product?category=660dafb95737493603ed9ef8&sort=${sort}`);
            return res.data.result;
        } catch (err) {
            console.log(err);
            throw err; // Rethrow the error to be caught by the component
        }
    }
);

const allProductsSlice = createSlice({
    name: "allProducts",
    initialState: {
        loading: false,
        error: null,
        data: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default allProductsSlice.reducer;
