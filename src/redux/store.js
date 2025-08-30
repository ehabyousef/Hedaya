import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/Products";
import menProductSlice from "./slices/getMenProducts";
import womenProductSlice from "./slices/getWomenProducts";
import thingsProductSlice from "./slices/getThings";
import whishlistSlice from "./slices/whishlistSlice";
import getWhislis from "./slices/getWhislis";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import TureOr from "./slices/TureOr";
import authSlice from "./slices/authSlice";
import categoriesSlice from "./slices/categoriesSlice";
import subcategoriesSlice from "./slices/subcategoriesSlice";
export const store = configureStore({
  reducer: {
    allProducts: ProductSlice,
    menProducts: menProductSlice,
    womenProducts: womenProductSlice,
    thingsProducts: thingsProductSlice,
    addToFav: whishlistSlice,
    wishlist: getWhislis,
    cart: cartSlice,
    whish: wishlistSlice,
    TureOr: TureOr,
    auth: authSlice,
    categories: categoriesSlice,
    subcategories: subcategoriesSlice,
  },
});
