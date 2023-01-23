import { createSlice } from "@reduxjs/toolkit";

// product slice object
export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    // createSlice use immuter so the Array.push method won't change the current state
    updateProducts: (state, action) => {
      return action.payload;
    },
  },
});

// define a selector
export const selectProducts = (state) => state.products;

// export action and reducer
export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;
