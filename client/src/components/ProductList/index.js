import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../ProductItem";
import { updateProducts, selectProducts } from "../../features/productSlice";
import { selectCurrentCategory } from "../../features/currentCategorySlice";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function ProductList() {
  // get the currentCategory state and products state
  const currentCategory = useSelector(selectCurrentCategory);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      // if data is returned from the query, trigger the updateProducts reducer 
      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      // if usequery is still loading, get the products from idb
      idbPromise("products", "get").then((products) => {
        dispatch(updateProducts(products));
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    // is user didn't select any category, return all products
    if (!currentCategory) {
      return products;
    }
    // otherwise only return the products under currentCategory
    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {/* pass the product to the productItem component */}
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
