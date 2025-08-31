import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkoutProduct: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
 setCheckoutProduct: (state, action) => {
  state.checkoutProduct.push(action.payload);

    },
    clearCheckoutProduct: (state) => {
      state.checkoutProduct = [];
    },
  updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.checkoutProduct.find(p => p.productSizeId === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.checkoutProduct.filter(p => p.id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { setCheckoutProduct, clearCheckoutProduct, updateQuantity,removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
