import { makeStyles } from "@material-ui/core";
import logo from "../assets/LastCall-Carousel.png";
import React from "react";
const useStyles = makeStyles(() => ({
  root: {
    marginTop: "100px",
    width: "100%",
    justifyContent: "center",
  },
}));
const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={logo} alt='TitlePage' />
    </div>
  );
};

export default Home;
