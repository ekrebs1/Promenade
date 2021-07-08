import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tab,
  Tabs,
  Login,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart, AccountCircle } from "@material-ui/icons";

import logo from "../../assets/LastCall_Logo.jpeg";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event, newValue) => {
    // history.push(`/${tabNameToIndex[newValue]}`);
    // setSelectedTab(newValue);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography>
            <img
              src={logo}
              alt='Last Call'
              height='50px'
              className={classes.image}
            />
            Last Call
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label='Show cart items' color='inherit'>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>

          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label='Login' />
          </Tabs>

          <IconButton
            edge='end'
            aria-label='account of current user'
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'>

            <AccountCircle />
            
          </IconButton>
        </Toolbar>
      </AppBar>
      


      {renderMenu}
    </>
  );
};



export default Navbar;
