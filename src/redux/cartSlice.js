// src/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to hold cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        console.log("existinf item is updated");
        
        // If the item is already in the cart, increase the quantity
        existingItem.quantity += item.quantity;
      } else {
        console.log("item os adaded");
        
        // If the item is not in the cart, add it
         state.items.push({ ...item, quantity: item.quantity });
       
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart(state) {
      state.items = []; // Clear all items in the cart
    },
  },
});

// Export actions to use in the component
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export the reducer to use in the store
export default cartSlice.reducer;
