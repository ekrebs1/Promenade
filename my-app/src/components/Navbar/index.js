import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import ShoppingCartIconOutlined from "@material-ui/icons/ShoppingCartOutlined";
import { ButtonGroup } from "@material-ui/core";
import TempDrawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,

    fontFamily: "Paytone One",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  return (
    <div className={classes.root}>
      <AppBar
        style={{
          background: "#fff",
          boxShadow: "none",
          color: "#28ACEA",
        }}
        position='static'>
        <Toolbar>
          <TempDrawer admin={admin} />

          <Typography variant='h4' className={classes.title}>
            PROMENADE
          </Typography>

          <Button href='/products' style={{ color: "#28ACEA" }}>
            SHOP
          </Button>
          <IconButton href='/cart' style={{ color: "#28ACEA" }}>
            <ShoppingCartIconOutlined />
          </IconButton>

          {!loggedIn ? (
            <ButtonGroup variant='text' aria-label='text primary button group'>
              <Button href='/login' style={{ color: "#28ACEA" }}>
                LOGIN
              </Button>
              <Button href='/register' style={{ color: "#28ACEA" }}>
                REGISTER
              </Button>
            </ButtonGroup>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
