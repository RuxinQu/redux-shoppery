import { createSlice } from "@reduxjs/toolkit";

// categories slice object
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    // createSlice use immuter so the Array.push method won't change the current state
    updateCategories: (state, action) => {
      return action.payload;
    },
  },
});

// define a selector
export const selectCategories = (state) => state.categories;

// export action and reducer
export const { updatecategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
