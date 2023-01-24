import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
// import reducers from the cart slice and cartOpen slice
import { addMultipleToCart, selectCart } from "../../features/cartSlice";
import { toggleCart, selectCartOpen } from "../../features/cartOpenSlice";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import "./style.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const Cart = () => {
  // to get the current state for cart and cartOpen
  const cart = useSelector(selectCart);
  const cartOpen = useSelector(selectCartOpen);
  const dispatch = useDispatch();

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // function provided by stripe: When the customer completes their purchase, they are redirected back to the website.
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // to get the items from cart from idb
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch(addMultipleToCart([...cart]));
    }

    if (!cart.length) {
      getCart();
    }
  }, [cart.length, dispatch]);

  // calculate total price in the cart
  function calculateTotal() {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  function toggleCartOpen() {
    dispatch(toggleCart());
  }

  // if the cart isn't expanded, show the icon below
  if (!cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCartOpen}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCartOpen}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {cart.length ? (
        <div>
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {/* show checkout button only when user is loggin  */}
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
