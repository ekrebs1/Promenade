import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ProductsList, Navbar, Home, CreateForm, Users } from "./components";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

const App = (totalItems, isAdmin = false) => {
  const classes = useStyles();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/all-products">
              <>
                {isAdmin ? <CreateForm /> : ""}
                <ProductsList />
              </>
            </Route>
            <Route path="/users">{isAdmin ? <Users /> : ""}</Route>
          </Switch>
        </div>
      </div>
    </Router>
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
