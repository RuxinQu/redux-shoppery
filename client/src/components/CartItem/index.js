import React from "react";
import { useDispatch } from "react-redux";

// import reducers from the cartSlice
import { removeFromCart, updateCartQuantity } from "../../features/cartSlice";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  // use the dispatch method from react-redux package to access the reducer from the store object
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart({ _id: item._id }));
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch(removeFromCart({ _id: item._id }));
      idbPromise("cart", "delete", { ...item });
    } else {
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
