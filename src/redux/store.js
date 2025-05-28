import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

import { productApi } from './productApi';
import { categoryApi } from './categoryApi';
import { authApi } from './authApi';
import { cartApi } from './cartApi';

// 🧩 Combine all reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  users: userReducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
});

// 🧠 Persistence config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'users'], // only persist cart and user (RTK Query state is not persisted)
};

// 🔐 Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🏗️ Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      productApi.middleware,
      categoryApi.middleware,
      authApi.middleware,
      cartApi.middleware
    ),
});

// 🚀 Create persistor
export const persistor = persistStore(store);
export default store;




// import { configureStore } from '@reduxjs/toolkit';
// import productsReducer from './productsSlice';
// import cartReducer from './cartSlice'
// import userReducer from './userSlice'
// import { productApi} from './productApi';
// import { categoryApi } from './categoryApi';
// import { authApi } from './authApi';
// import {cartApi} from './cartApi'

// const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     cart:cartReducer,
//     users:userReducer,
//     [productApi.reducerPath]:productApi.reducer,
//     [categoryApi.reducerPath]:categoryApi.reducer,
//     [authApi.reducerPath]:authApi.reducer,
//     [cartApi.reducerPath]:cartApi.reducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware().concat(
//       productApi.middleware,
//       categoryApi.middleware,
//       authApi.middleware,
//       cartApi.middleware,
//     ),
// });

// export default store;
