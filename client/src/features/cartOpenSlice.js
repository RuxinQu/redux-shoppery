import { createSlice } from "@reduxjs/toolkit";

// cart slice object
export const cartOpenSlice = createSlice({
  name: "cartOpen",
  initialState: false,
  reducers: {
    // createSlice use immuter so the Array.push method won't change the current state
    toggleCart: (state, actions) => {
      return state = !state;
    },
  },
});

// define a selector
export const selectCartOpen = (state) => state.cartOpen;

// export action and reducer
export const { toggleCart } = cartOpenSlice.actions;
export default cartOpenSlice.reducer;
