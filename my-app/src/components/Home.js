import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "100px",
    justifyContent: "center",
  },
}));
const Home = () => {
  const classes = useStyles();
  return <div className={classes.root}> This is Home Page! </div>;
};

export default Home;
