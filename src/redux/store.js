import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from './slices/getAllProducts';
import menProductSlice from './slices/getMenProducts';
import womenProductSlice from './slices/getWomenProducts';
import thingsProductSlice from './slices/getThings';
import whishlistSlice from "./slices/whishlistSlice";
import CartClice from "./slices/CartClice";
import getWhislis from "./slices/getWhislis";
import wishlistSlices from "./slices/wishlistSlices";
import TureOr from "./slices/TureOr";
export const store = configureStore({
    reducer: {
        allProducts: ProductSlice,
        menProducts: menProductSlice,
        womenProducts: womenProductSlice,
        thingsProducts: thingsProductSlice,
        addToFav: whishlistSlice,
        wishlist: getWhislis,
        Cart: CartClice,
        whish: wishlistSlices,
        TureOr: TureOr
    }
})