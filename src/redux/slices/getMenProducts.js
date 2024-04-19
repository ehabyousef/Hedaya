// menProducts slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMenProducts = createAsyncThunk(
    "menProducts/fetchProducts",
    async (sort) => {
        try {
            const res = await axios.get(`https://backend-kappa-beige.vercel.app/product?subCategory=660db0425737493603ed9efd&sort=${sort}`);
            return res.data.result;
        } catch (err) {
            console.log(err);
            throw err; // Rethrow the error to be caught by the component
        }
    }
);

const menProductsSlice = createSlice({
    name: "menProducts",
    initialState: {
        loading: false,
        error: null,
        data: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMenProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default menProductsSlice.reducer;