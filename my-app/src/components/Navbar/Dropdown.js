import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountBox from "@material-ui/icons/AccountBox";
import Menu from "@material-ui/core/Menu";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
const Dropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        // className={downloadMenuClasses.button}
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}>
        <AccountBox />
        <span>My Account</span>
        <ExpandMoreIcon />
      </Button>
      <Menu
        id='simple-menu'
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuList>
          <MenuItem onClick={handleClose}>Login</MenuItem>

          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Dropdown;
