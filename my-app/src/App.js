import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  ProductsList,
  Navbar,
  Home,
  CreateForm,
  Login,
  Register,
} from "./components";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

const App = (totalItems, isAdmin = false) => {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/login'>
              <Login username={setUsername} password={setPassword} />
            </Route>
            <Route path='/register'>
              <Register
                email={setEmail}
                username={setUsername}
                password={setPassword}
                address={setAddress}
                city={setCity}
                state={setState}
                zip={setZip}
              />
            </Route>
            <Route path='/all-products'>
              <>
                {isAdmin ? <CreateForm /> : ""}
                <ProductsList />
              </>
            </Route>
            {/* <Route path='/users'>
              {isAdmin ? <Users /> : ""}</Route> */}
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
