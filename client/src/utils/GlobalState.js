import { configureStore } from "@reduxjs/toolkit";

// import the reducers from slice FileSystem
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import cartOpenReducer from "../features/cartOpenSlice";
import categoriesReducer from "../features/categoriesSlice";
import currentCategoryReducer from "../features/currentCategorySlice";

// configure the store object and export as default
export default configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    cartOpen: cartOpenReducer,
    categories: categoriesReducer,
    currentCategory: currentCategoryReducer,
  },
});

// import React, { createContext, useContext } from "react";
// import { useProductReducer } from "./reducers";

// const StoreContext = createContext();
// const { Provider } = StoreContext;

// const StoreProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useProductReducer({
//     products: [],
//     cart: [],
//     cartOpen: false,
//     categories: [],
//     currentCategory: "",
//   });

//   return <Provider value={[state, dispatch]} {...props} />;
// };

// const useStoreContext = () => {
//   return useContext(StoreContext);
// };

// export { StoreProvider, useStoreContext };
