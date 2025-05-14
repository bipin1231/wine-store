import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice'
import { productApi} from './productApi';
import { categoryApi } from './categoryApi';
import { authApi } from './authApi';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart:cartReducer,
    [productApi.reducerPath]:productApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      categoryApi.middleware,
      authApi.middleware,
    ),
});

export default store;
