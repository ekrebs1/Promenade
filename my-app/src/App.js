import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Navbar,
  Register,
  Login,
  Products,
  Cart,
} from "./components/index";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem("Cart")) {
      setCart(JSON.parse(localStorage.getItem("Cart")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route exact path='/'>
            <Home loggedIn={loggedIn} />
          </Route>
          <Route exact path='/register'>
            <Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path='/login'>
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setAdmin={setAdmin}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route exact path='/products'>
            <Products cart={cart} setCart={setCart} loggedIn={loggedIn} />
          </Route>
          <Route exact path='/cart'>
            <Cart cart={cart} setCart={setCart} loggedIn={loggedIn} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
