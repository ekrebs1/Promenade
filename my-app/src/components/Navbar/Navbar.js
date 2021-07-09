import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tab,
  Tabs,
  // Login,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Link,
  Button,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import logo from "../../assets/LastCall_Logo.jpeg";
// import useStyles from "./styles";

const Navbar = () => {
  // const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography>
            <img src={logo} alt="Last Call" height="50px" />
            Last Call
          </Typography>

          <Button>
            <a href="/" style={{ textDecoration: "none" }}>
              Home
            </a>
          </Button>
          <Button>
            <a href="/all-products" style={{ textDecoration: "none" }}>
              Shop
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
          <Button>
            <a href="/login" style={{ textDecoration: "none" }}>
              Login
            </a>
          </Button>

          <IconButton aria-label="Show cart items" color="inherit">
            <Badge badgeContent={2} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
