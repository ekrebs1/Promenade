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

import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const handleAddToCart = () => onAddToCart(1, product.id);
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
        <IconButton aria-label='Add to Cart' onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
