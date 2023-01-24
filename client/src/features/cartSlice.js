import { createSlice } from "@reduxjs/toolkit";

// cart slice object
export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // createSlice use immuter so the Array.push method won't change the current state
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    addMultipleToCart: (state, action) => {
      state.push(...action.payload);
    },
    updateCartQuantity: (state, action) => {
       state.map((item) => {
        if (item._id === action.payload._id) {
          return item.purchaseQuantity = action.payload.purchaseQuantity;
        }
      });
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
    clearCart: (state, action) => {
      return "";
    },
  },
});

// define a selector
export const selectCart = (state) => state.cart;

// export action and reducer
export const { addToCart, addMultipleToCart,updateCartQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
