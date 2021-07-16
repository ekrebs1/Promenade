import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Typography,
  IconButton,
} from "@material-ui/core";

import { AddShoppingCart } from "@material-ui/icons";
import { addCartItem } from "../../../api";
import { myUserId } from "../../../api";
import useStyles from "./styles";

const Product = ({ product, index, userId, cart }) => {
  const { name, description, price, image_url, quantity } = product;

  const classes = useStyles();
  const token = localStorage.getItem("token");

  const handleAddtoCart = async () => {
    if (myUserId) {
      const newCartItem = await addCartItem(1, product.id, myUserId);
    }

    localStorage.setItem("Cart", JSON.stringify(cart));

    alert(`${name} added to cart!`);
  };
  // console.log(product);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image_url}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant='h5' gutterBottom>
            {product.name}
          </Typography>
          <Typography variant='h5'>${product.price}</Typography>
        </div>
        <Typography variant='body2' color='textSecondary' bottomMargin='20px'>
          {product.description}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Category:
          <br></br>
          <Chip
            label={product.category}
            variant='outlined'
            onClick={handleClick}
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label='Add to Cart' onClick={handleAddtoCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
