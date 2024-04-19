// womenProducts slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchwoMenProducts = createAsyncThunk(
    "womenProducts/fetchProducts",
    async () => {
        try {
            const res = await axios.get("https://backend-kappa-beige.vercel.app/product?subCategory=660dce5572576adbe362b2c6");
            return res.data.result;
        } catch (err) {
            console.log(err);
            throw err; // Rethrow the error to be caught by the component
        }
    }
);

const womenProductsSlice = createSlice({
    name: "womenProducts",
    initialState: {
        loading: false,
        error: null,
        data: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchwoMenProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchwoMenProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchwoMenProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default womenProductsSlice.reducer;