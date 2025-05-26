import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice'
import userReducer from './userSlice'
import { productApi} from './productApi';
import { categoryApi } from './categoryApi';
import { authApi } from './authApi';
import {cartApi} from './cartApi'

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart:cartReducer,
    users:userReducer,
    [productApi.reducerPath]:productApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      categoryApi.middleware,
      authApi.middleware,
      cartApi.middleware,
    ),
});

export default store;
