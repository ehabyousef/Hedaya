import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/Products";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import authSlice from "./slices/authSlice";
import categoriesSlice from "./slices/categoriesSlice";
import subcategoriesSlice from "./slices/subcategoriesSlice";
import usersSlice from "./slices/usersSlice";
export const store = configureStore({
  reducer: {
    allProducts: ProductSlice,
    cart: cartSlice,
    whish: wishlistSlice,
    auth: authSlice,
    categories: categoriesSlice,
    subcategories: subcategoriesSlice,
    users: usersSlice,
  },
});
