import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { removeFromCart, updateCartQuantity } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  // const [, dispatch] = useStoreContext();
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   _id: item._id,
    // });
    dispatch(removeFromCart({_id: item._id}));
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch(removeFromCart({_id: item._id}));
      idbPromise("cart", "delete", { ...item });
    } else {
      // dispatch({
      //   type: UPDATE_CART_QUANTITY,
      //   _id: item._id,
      //   purchaseQuantity: parseInt(value),
      // });
      dispatch(
        updateCartQuantity({ ...item, purchaseQuantity: parseInt(value) })
      );
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => handleRemoveFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
