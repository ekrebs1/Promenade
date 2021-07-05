import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ProductsList, Navbar } from "./components";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <>
      <Navbar />

      <ProductsList />
    </>
  );
};

export default App;
