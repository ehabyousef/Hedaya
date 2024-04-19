import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWishlistProducts = createAsyncThunk(
    "wishlist/fetchWishlistProducts",
    async () => {
        const userToken = localStorage.getItem("userToken");
        const config = {
            headers: {
                token: userToken,
            },
        };

        try {
            const wishlistIds = await axios.get(
                `https://backend-kappa-beige.vercel.app/product/wishlist`,
                config
            );
            const productsPromises = wishlistIds.data.results.map((productId) =>
                axios.get(
                    `https://backend-kappa-beige.vercel.app/product/single/${productId}`,
                    config
                )
            );
            const productsResponses = await Promise.all(productsPromises);
            const products = productsResponses
                .filter((res) => res.data.result !== null)
                .map((res) => res.data.result);
            return products;
        } catch (error) {
            throw error;
        }
    }
);

const getWishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        loading: false,
        error: null,
        products: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlistProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchWishlistProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default getWishlistSlice.reducer;
