import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import { getAllCartItems, getAllProducts, addCartItem } from "../../api";
import Navbar from "../Navbar/Navbar";

// const products = [
//   {
//     id: 1,
//     name: "Product 1",
//     description: "some type of alcohol",
//     price: 12.99,
//     quantity: 2,
//     image: "https://picsum.photos/200/300",
//     category: "vodka",
//     inventory: 21,
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     description: "another alcohol",
//     price: 22.5,
//     quantity: 1,
//     image: "https://picsum.photos/200/300",
//     category: "whiskey",
//     inventory: 14,
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     description: "some description",
//     price: 14.0,
//     quantity: 2,
//     image: "https://picsum.photos/200/300",
//     category: "gin",
//     inventory: 30,
//   },
// ];

const ProductsList = ({ onAddToCart }) => {
  const classes = useStyles();
  const [grabbedProducts, setGrabbedProducts] = useState();
  const [grabbedCartItems, setGrabbedCartItems] = useState({});

  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      setGrabbedProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const cartItems = await getAllCartItems();
      setGrabbedCartItems(cartItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await addCartItem(productId, quantity);

    setGrabbedCartItems(item);
  };

  useEffect(() => {
    fetchProducts();
    fetchCartItems();
  }, []);
  console.log(fetchCartItems);
  // console.log(grabbedCartItems);
  console.log(grabbedProducts);

  return (
    <div className={classes.card}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={4} className={classes.grid} justify="center">
          {grabbedProducts?.map((product, index) => {
            return <Product product={product} onAddToCart={handleAddToCart} />;
          })}
        </Grid>
      </main>
    </div>
  );
};

export default ProductsList;
