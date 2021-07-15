import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tab,
  Tabs,
  makeStyles,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Link,
  Button,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import Dropdown from "./Dropdown";
// import { Login, Register } from "c";

// import useStyles from "./styles";

const Navbar = () => {
  const useStyles = makeStyles(() => ({
    header: {
      width: "100%",
    },
    root: {
      overflow: "visible",
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      minHeight: "40px",
      padding: "10px 15px 10px 50px",
    },

    navLink: {
      margin: "0 10px",
      padding: "0",
      fontWeight: "200",
      textTransform: "uppercase",
      letterSpacing: "3.5px",
      cursor: "pointer",
      color: "#333",
      textDecoration: "none",
      // display: "flex",
      // justifyContent: "flex-end",

      "&:hover": {
        opacity: "0.2",
      },
      div: {
        padding: "0px 50px 0px 50px",
      },
    },
  }));
  const classes = useStyles();

  return (
    <>
      <AppBar position='fixed' color='inherit'>
        <Toolbar className={classes.root}>
          <Button className={classes.navLink}>
            <a href='/' style={{ textDecoration: "none" }}>
              Home
            </a>
          </Button>
          <Button className={classes.navLink}>
            <a href='/all-products' style={{ textDecoration: "none" }}>
              Shop
            </a>
          </Button>
          <Button className={classes.navLink}>
            <a href='/register' style={{ textDecoration: "none" }}>
              Register
            </a>
          </Button>
          {/* {isAdmin ? (
            <Button>
              <a href="/users" style={{ textDecoration: "none" }}>
                Users
              </a>
            </Button>
          ) : (
            ""
          )} */}
          <Dropdown />
          {/* <Button className={classes.navLink}>
            <a href='/login' style={{ textDecoration: "none" }}>
              Login
            </a> */}
          {/* </Button> */}
          <div className={classes.cart}>
            <IconButton aria-label='Show cart items' color='inherit'>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
