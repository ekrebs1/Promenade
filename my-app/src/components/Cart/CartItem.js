import React, { useState } from "react";
import { removeItemFromCart } from "../../api/cart";
import { updateProductQuantity } from "../../api/products";
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader, TextField } from "@material-ui/core";

import Delete from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    margin: "20px",
  },
  media: {
    height: "250px",
    width: "200px",
    paddingTop: "56.25%", // 16:9
  },
  content: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const CartItem = ({ index, token, item, cart, setCart }) => {
  const classes = useStyles();
  const { id, name, description, image_url, quantity, price, product_id } =
    item;
  const [ItemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = async (event) => {
    const value = event.target.value;
    if (value < 0) {
      setItemQuantity(ItemQuantity);
    } else {
      setItemQuantity(value);
    }
  };
  const handleProductRemove = async () => {
    try {
      if (token) {
        await removeItemFromCart(product_id, token);
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
        await updateProductQuantity(product_id, ItemQuantity, token);
      }
      const updatedProducts = [...cart];
      updatedProducts[index].quantity = ItemQuantity;
      setCart(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={name} />
      <CardMedia className={classes.media} image={image_url} title={name} />

      <CardContent className={classes.content}>
        <CardActions>
          <TextField
            variant='outlined'
            value={ItemQuantity}
            min='0'
            // onInput="validity.valid||(value='')"
            onChange={(event) => {
              handleQuantityChange(event);
            }}
            onBlur={(event) => {
              DBUpdateQuantity(event);
            }}
            style={{ width: "30" }}
          />
          <p className='price'>${(price * ItemQuantity).toFixed(2)}</p>
          <IconButton
            onClick={() => {
              handleProductRemove();
            }}>
            <Delete />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CartItem;
