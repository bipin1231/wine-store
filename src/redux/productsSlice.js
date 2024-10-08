import { createSlice } from '@reduxjs/toolkit';
import { collection, products } from '../assets/assets';
// Sample initial product data for your wine store
const initialProducts = products
const itemCollection=collection
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: initialProducts,
    collection:itemCollection,
    loading: false,
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload); // Add a new product
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload); // Remove product by id
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload; // Update product by id
      }
    },
  },
});

// Export actions and reducer
export const { addProduct, removeProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
