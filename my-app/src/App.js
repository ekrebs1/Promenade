import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryButtons from "./components/Home/CategoryButtons";

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
            <CategoryButtons loggedIn={loggedIn} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
