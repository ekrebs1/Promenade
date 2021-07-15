import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import Menu from "@material-ui/core/Menu";
import MenuList from "@material-ui/core/MenuList";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const Admin = (isAdmin) => {
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
        <SettingsApplicationsIcon />
        <span>Admin</span>
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
          <MenuItem component='a' href='/admin'>
            Add Product
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Admin;
