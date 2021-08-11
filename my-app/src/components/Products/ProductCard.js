import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { addItemToCart } from "../../api/cart";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: "400px",
    paddingTop: "56.25%", // 16:9
  },
}));

const ProductCard = ({ index, product, cart }) => {
  const classes = useStyles();
  const { name, description, price, image_url, in_stock } = product;
  const token = localStorage.getItem("token");
  const handleAddToCart = async () => {
    if (token) {
      await addItemToCart(product.id, 1, token);
    }
    const existingProductInCart = cart.find((element) => element.name === name);
    if (existingProductInCart) {
      existingProductInCart.quantity += 1;
      cart.splice(index, 1, existingProductInCart);
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem("Cart", JSON.stringify(cart));
  };
  return (
    <Card className={classes.root}>
      <CardHeader title={name} />
      <CardMedia className={classes.media} image={image_url} title={name} />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {description}
        </Typography>
        <Typography variant='h6'>Price: ${price}</Typography>
        {in_stock ? null : (
          <p className='StockStatus' style={{ color: "red" }}>
            Out of stock!
          </p>
        )}
        <CardActions>
          <Button
            className={classes.cartBtn}
            aria-label='add to cart'
            variant='contained'
            onClick={() => {
              in_stock ? handleAddToCart() : alert("Item out of stock!");
            }}>
            <AddShoppingCartIcon /> Add to Cart
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
