import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Products from "./Pages/Products";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route exact path='/'>
            <Home loggedIn={loggedIn} />
          </Route>
          <Route exact path='/all-products'>
            <Products />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
