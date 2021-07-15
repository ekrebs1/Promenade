import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { myUserId } from "./api";
import {
  ProductsList,
  Navbar,
  Home,
  CreateForm,
  Login,
  Register,
  Cart,
} from "./components";
import { getAllProducts } from "./api";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const useStyles = makeStyles({
  // gridContainer: {
  //   paddingLeft: "40px",
  //   paddingRight: "40px",
  // },
});

const App = () => {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [product, setProduct] = useState();
  const [cart, setCart] = useState([]);
  const myToken = JSON.parse(localStorage.getItem("token"));
  const [currentUserId, setCurrentUserId] = useState();
  const [isAdmin, setIsAdmin] = useState(null);
  const [grabbedProducts, setGrabbedProducts] = useState();
  const [currentUser, setCurrentUser] = useState();
  const retrieveProducts = async () => {
    try {
      const products = await getAllProducts();
      setGrabbedProducts(products);
      console.log(products);
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveUser = async () => {
    myUserId(myToken)
      .then((user) => {
        setCurrentUserId(user.id);

        setUsername(user.username);
        setEmail(user.email);
        setAddress(user.address);
        setCity(user.city);
        setState(user.state);
        setZip(user.zip);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await retrieveProducts();
      await retrieveUser();
    };
    fetchProducts();
  }, []);

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
              <Login
                // username={setUsername}
                // password={setPassword}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
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
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </Route>
            <Route path='/carts'>
              <Cart
                cart={cart}
                setCart={setCart}
                currentUserId={currentUserId}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </Route>
            <Route exact path='/admin'>
              <CreateForm />
            </Route>
            <Route path='/all-products'>
              <>
                {isAdmin ? <CreateForm /> : ""}
                <ProductsList
                  cart={cart}
                  setCart={setCart}
                  product={setProduct}
                  currentUser={currentUser}
                  setCurrentUserId={setCurrentUserId}
                />
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

export default App;
