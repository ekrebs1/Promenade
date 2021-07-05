import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import { getAllProducts } from "../../api";

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

const ProductsList = () => {
  const classes = useStyles();
  const [grabbedProducts, setGrabbedProducts] = useState();

  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      setGrabbedProducts(products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify='center'>
          {grabbedProducts?.map((product, index) => {
            return <Product product={product} />;
          })}
        </Grid>
      </main>
    </div>
  );
};

export default ProductsList;
