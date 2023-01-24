import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import {
  addToCart,
  updateCartQuantity,
  selectCart,
} from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const { image, name, _id, price, quantity } = item;

  const handleAddItem = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      // if the item is in the cart already, increase the quantity by 1
      dispatch(
        updateCartQuantity({
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        })
      );
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      // if the item isn't in the cart, set the purchase quantity to 1
      dispatch(addToCart({ ...item, purchaseQuantity: 1 }));
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={handleAddItem}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
