import { createSlice } from "@reduxjs/toolkit";

// current category slice object
export const currentCategorySlice = createSlice({
  name: "currentCategory",
  initialState: "",
  reducers: {
    // createSlice use immuter so the Array.push method won't change the current state
    updateCurrentCategory: (state, action) => {
      return action.payload;
    },
  },
});

// define a selector
export const selectCurrentCategory = (state) => state.currentCategory;

// export action and reducer
export const { updateCurrentCategory } = currentCategorySlice.actions;
export default currentCategorySlice.reducer;
