import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ProductsList, Navbar } from "./components";
import Login from './components/Login';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

const App = (totalItems) => {
  const classes = useStyles();

  return (
    <>
      <Navbar totalItems={totalItems} />
      <Login/>
      <ProductsList />
    </>
  );
};

// function Apps() {
//   return (
//   <div className="Apps">
//     <Login/>
//   </div>
//   );
// }

export default App;
