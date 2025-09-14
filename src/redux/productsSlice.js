import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkoutProduct: null,
  orderId:null,
  orderNumber:null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
 setCheckoutProduct: (state, action) => {
  state.checkoutProduct=action.payload;

    },
 setOrderId: (state, action) => {
  state.orderId=action.payload

    },
 clearOrderId: (state, action) => {
  state.orderId=null

    },
     setOrderNumber: (state, action) => {
  state.orderNumber=action.payload

    },
 clearOrderNumber: (state, action) => {
  state.orderNumber=null

    },
    clearCheckoutProduct: (state) => {
      state.checkoutProduct = [];
    },
    updateCartItemCheckoutQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.checkoutProduct.find(p => p.cartItemId === id);
      if (product) {
        product.quantity = quantity;
      }
    },
  updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.checkoutProduct.quantity=quantity;
    },
    removeProduct: (state, action) => {
      state.products = state.checkoutProduct.filter(p => p.id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { setCheckoutProduct, clearCheckoutProduct, updateQuantity,removeProduct,setOrderId,clearOrderId,setOrderNumber,clearOrderNumber ,
  updateCartItemCheckoutQuantity
} = productsSlice.actions;
export default productsSlice.reducer;
