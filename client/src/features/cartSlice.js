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
    removeFromCart: (state, action) => {
      state.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state, action) => {
      return "";
    },
  },
});

// define a selector
export const selectCart = (state) => state.cart;

// export action and reducer
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
