import React, { useState, useEffect } from "react";
import { getProducts } from "../../api/products";
import CategoryButtons from "./CategoryButtons";
import ProductCard from "./ProductCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",

    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

const Products = ({ cart, setCart }) => {
  const classes = useStyles();
  const [grabbedProducts, setGrabbedProducts] = useState();

  const getAllProducts = async () => {
    try {
      const products = await getProducts();
      setGrabbedProducts(products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <CategoryButtons />
      <h1 className='Title'>All Products</h1>
      <Grid
        container
        direction='row'
        alignItems='center'
        className={classes.root}>
        <div className={classes.root}>
          {grabbedProducts?.map((product, index) => {
            return (
              <ProductCard
                key={product.id}
                index={index}
                product={product}
                cart={cart}
              />
            );
          })}
        </div>
      </Grid>
    </div>
  );
};

export default Products;
