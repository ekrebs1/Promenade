import React, { useEffect, useState } from "react";
// import { deleteCartItems } from "../../../../db";
import { Delete } from "@material-ui/icons";
import {
  updateProductQuantity,
  deleteCartItem,
  getUsersCurrentCartItems,
} from "../../../api";

const CartItem = ({ index, token, product, usersId }) => {
  const { id, name, description, image_url, quantity, price, productId } =
    product;
  const [ItemQuantity, setItemQuantity] = useState(quantity);
  const [cart, setCart] = useState([]);

  const handleQuantityChange = async (event) => {
    const value = event.target.value;
    if (value < 0) {
      setItemQuantity(ItemQuantity);
    } else {
      setItemQuantity(value);
      console.log(id);
    }
  };

  const handleProductRemove = async () => {
    try {
      if (token) {
        await deleteCartItem(productId, token);
      }
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const DBUpdateQuantity = async (event) => {
    try {
      if (token) {
        await updateProductQuantity(productId, ItemQuantity, token);
      }
      const updatedProducts = [...cart];
      updatedProducts[index].quantity = ItemQuantity;
      setCart(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='CartCard'>
      <img className='productImg' src={image_url} alt='Computer Part' />
      <div className='CartCardInfo'>
        <h1 className='name'>{name}</h1>
        <p className='description'>{description}</p>
      </div>
      <div className='QuantityContainer'>
        <input
          className='QuantityInput'
          type='number'
          value={ItemQuantity}
          min='0'
          oninput="validity.valid||(value='')"
          onChange={(event) => {
            handleQuantityChange(event);
          }}
          onBlur={(event) => {
            DBUpdateQuantity(event);
          }}
        />
      </div>
      <p className='price'>${(price * ItemQuantity).toFixed(2)}</p>
      <img
        className='deleteIcon'
        src={Delete}
        alt='Remove from cart'
        onClick={() => {
          handleProductRemove();
        }}
      />
    </div>
  );
};

export default CartItem;
