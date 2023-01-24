import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Cart from "../components/Cart";
import {
  updateCartQuantity,
  removeFromCart,
  addToCart,
  selectCart,
} from "../features/cartSlice";
import { updateProducts, selectProducts } from "../features/productSlice";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

function Detail() {
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  // get the id from the url param
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch(updateProducts(indexedProducts));
      });
    }
  }, [products, data, loading, dispatch, id]);

  const handleAddToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch(
        // if the item is already in the cart increase the quantity
        updateCartQuantity({
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        })
      );
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      // add the item in the cart set the purchase quantity to 1
      dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }));
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const handleRemoveFromCart = () => {
    // to remove the product from the cart and the cache
    dispatch(removeFromCart(currentProduct));
    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
