import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const loadCartFromLocalStorage = () => {
    try {
        const cart = localStorage.getItem("cart");
        if (cart) {
            return JSON.parse(cart);
        }
    } catch (error) {
        console.error("Error loading cart from local storage:", error);
    }
    return [];
};

const saveCartToLocalStorage = (cart) => {
    try {
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving cart to local storage:", error);
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: loadCartFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;
            const existingProduct = state.find((product) => product.id === id);
            if (existingProduct) {
                existingProduct.qty += 1;
            } else {
                state.push({ ...action.payload, qty: 1 });
            }
            saveCartToLocalStorage(state);
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
                title: "Item Added To Cart"
            })
        },
        removeFromCart: (state, action) => {
            const index = state.findIndex((product) => product.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);
                saveCartToLocalStorage(state);
            }
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
                title: "Item Deleted From Cart"
            })
        },
        increaseQuantity: (state, action) => {
            const { id } = action.payload;
            const product = state.find((prod) => prod.id === id);
            if (product) {
                product.qty += 1;
                saveCartToLocalStorage(state);
            }
        },
        decreaseQuantity: (state, action) => {
            const { id } = action.payload;
            const product = state.find((prod) => prod.id === id);
            if (product && product.qty > 1) {
                product.qty -= 1;
                saveCartToLocalStorage(state);
            }
        },
        clearCart: (state) => {
            state = [];
            saveCartToLocalStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
