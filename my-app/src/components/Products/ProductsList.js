import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import { getAllProducts, getUser } from "../../api";
import Navbar from "../Navbar/Navbar";



const ProductsList = ({ cart, setCart }) => {
  const classes = useStyles();
  const [grabbedProducts, setGrabbedProducts] = useState();
  // const [currentUserId, setCurrentUserId] = useState();

  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      setGrabbedProducts(products);
      console.log(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(fetchCartItems);
  // console.log(grabbedCartItems);

  return (
    <div className={classes.card}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={4} className={classes.grid} justify='center'>
          {grabbedProducts?.map((product, index) => {
            return (
              <Product
                key={product.id}
                index={index}
                product={product}
                cart={cart}
                setCart={setCart}
                // ((prevItems) => {
                //   return [...prevItems, ...newItem];
                // })}
              />
            );
          })}
        </Grid>
      </main>
    </div>
  );
};

export default ProductsList;
