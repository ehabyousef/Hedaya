// menProducts slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchThingsProducts = createAsyncThunk(
    "thingsProducts/fetchProducts",
    async (sort) => {
        try {
            const res = await axios.get(`https://backend-kappa-beige.vercel.app/product?subCategory=661020599e25e92a647b7672&sort=${sort}`);
            return res.data.result;
        } catch (err) {
            console.log(err);
            throw err; // Rethrow the error to be caught by the component
        }
    }
);

const thingsProductsSlice = createSlice({
    name: "thingsProducts",
    initialState: {
        loading: false,
        error: null,
        data: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchThingsProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchThingsProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchThingsProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default thingsProductsSlice.reducer;