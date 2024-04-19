import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// Fetch wishlist thunk
export const fetchWhishlist = createAsyncThunk(
    "wishlist/fetchProducts",
    async ({ itemID }) => {
        const userToken = localStorage.getItem("userToken");
        const config = {
            headers: {
                token: userToken,
            },
        };

        try {
            const response = await axios.put(
                `https://backend-kappa-beige.vercel.app/product/redHeart/${itemID}`,
                {},
                config
            );
            console.log(response.data);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Item Added To Whishlist"
            })
            return response.data; // Return the data from the response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to be caught in the rejected case
        }
    }
);

// Delete from wishlist thunk
export const fetchDelWhishlist = createAsyncThunk(
    "wishlist/deleteProduct",
    async ({ itemID }) => {
        const userToken = localStorage.getItem("userToken");
        const config = {
            headers: {
                token: userToken,
            },
        };

        try {
            const response = await axios.patch(
                `https://backend-kappa-beige.vercel.app/product/deleteWishlist/${itemID}`, // Ensure this URL is correct
                {},
                config
            );
            console.log(response.data);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "warning",
                title: "Item Deleted From Wishlist"
            });
            return response.data; // Return the data from the response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to be caught in the rejected case
        }
    }
);

// Wishlist slice
const WishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        loading: false,
        error: null,
        data: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWhishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWhishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWhishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchDelWhishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDelWhishlist.fulfilled, (state, action) => {
                state.loading = false;
                // Handle deletion from the wishlist data
                state.data = action.payload
            })
            .addCase(fetchDelWhishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default WishlistSlice.reducer;
