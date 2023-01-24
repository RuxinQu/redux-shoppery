import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import {
  updateCategories,
  selectCategories,
} from "../../features/categoriesSlice";
import {
  updateCurrentCategory,
} from "../../features/currentCategorySlice";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  // get the categories state and dispatch function
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      // if categoryData is returned update the categories state with the categoryData
      dispatch(updateCategories(categoryData.categories));
      // save the data to loacl idb
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      // otherwise get the data from the idb
      idbPromise("categories", "get").then((categories) => {
        dispatch(updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    // click on each category and the product will be udpated
    dispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
