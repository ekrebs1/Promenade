import React, { useEffect } from "react";
import { getCart, checkoutUser } from "../../api/cart";
import CartItem from "./CartItem";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Cart = (props) => {
  const classes = useStyles();
  const { cart, setCart, loggedIn } = props;
  const token = localStorage.getItem("token");
  let total = 0.0;

  useEffect(() => {
    async function fetchCart(token) {
      const fetchedCart = await getCart(token);
      console.log(fetchedCart);
      setCart(fetchedCart);
    }
    if (token) {
      fetchCart(token);
    }
  }, [setCart, token]);

  const checkout = async () => {
    const url = await checkoutUser(cart);
    window.location = url;
  };

  return (
    <div className='CartCards'>
      <Grid
        container
        direction='row'
        alignItems='center'
        className={classes.root}>
        {cart.map((item, index) => {
          total += item.price * item.quantity;
          return (
            <CartItem
              key={index}
              index={index}
              item={item}
              token={token}
              setCart={setCart}
              cart={cart}
            />
          );
        })}
        <Card className={classes.root} elevation={15}>
          <CardContent>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom>
              Shopping Cart
            </Typography>
            <Typography variant='h3' component='div'>
              Order Summary
            </Typography>
            <Typography variant='subtitle2'>
              <hr />
            </Typography>
            <Grid container>
              <Grid item xs={11} sm={11} md={11} lg={11}>
                <Typography variant='body1' component='div'>
                  Shipping
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <Typography variant='h6' component='div'>
                  $0
                </Typography>
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10}>
                <Typography variant='body1' component='div'>
                  TOTAL:
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <Typography variant='h6' component='div'>
                  ${total.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions className={classes.root}>
            <Button
              size='medium'
              color='primary'
              variant='contained'
              onClick={() => {
                if (loggedIn) {
                  checkout();
                } else {
                  alert("Please log in or register to checkout");
                }
              }}>
              Checkout
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
};

export default Cart;
