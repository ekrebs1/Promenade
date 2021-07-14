import React, { useState, useEffect } from "react";

import CartItem from "./CartItem/CartItem";
import { getCart, getUsersCurrentCartItems } from "../../api";

const Cart = ({ currentUserId }) => {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState([]);
  let total = 0.0;

  const retrieveCartItems = async () => {
    if (!currentUserId) {
      return;
    } else {
      await getUsersCurrentCartItems(currentUserId)
        .then((cartItems) => {
          setCart(cartItems);
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  useEffect(() => {
    const fetchCartItems = () => {
      retrieveCartItems();
    };
    fetchCartItems();
  }, []);
 
  return (
    <div className='CartCards'>
      {cart.map((product, index) => {
        console.log(product);
        total += product.price * product.quantity;
        return (
          <CartItem
            key={index}
            index={index}
            product={product}
            token={token}
            setCart={setCart}
            cart={cart}
          />
        );
      })}
    </div>
  );
};

export default Cart;
