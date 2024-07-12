import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const loadWishlistFromLocalStorage = () => {
    try {
        const wishlist = localStorage.getItem("wishlist");
        if (wishlist) {
            return JSON.parse(wishlist).filter(item => item !== null);
        }
    } catch (error) {
        console.error("Error loading wishlist from local storage:", error);
    }
    return [];
};

const saveWishlistToLocalStorage = (wishlist) => {
    try {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
        console.error("Error saving wishlist to local storage:", error);
    }
};

const wishlistSlices = createSlice({
    name: "wishlist",
    initialState: loadWishlistFromLocalStorage(),
    reducers: {
        addToWishlist: (state, action) => {
            if (action.payload) {
                state.push(action.payload);
                saveWishlistToLocalStorage(state);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Item Added To Wishlist"
                });
            }
        },
        removeFromWishlist: (state, action) => {
            const index = state.findIndex((product) => product?.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);
                saveWishlistToLocalStorage(state);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "warning",
                    title: "Item Removed From Wishlist"
                });
            }
        },
        clearWishlist: (state) => {
            state.length = 0; // Use length = 0 to clear the array
            saveWishlistToLocalStorage(state);
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlices.actions;
export default wishlistSlices.reducer;
