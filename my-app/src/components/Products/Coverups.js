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

const Coverups = ({ cart }) => {
  const classes = useStyles();
  const [grabbedCoverups, setGrabbedCoverups] = useState();

  const getAllCoverups = async () => {
    try {
      const products = await getProducts();
      let coverups = products.filter((product) => {
        return product.type.toLowerCase().includes("cover-up");
      });
      setGrabbedCoverups(coverups);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllCoverups();
  }, []);

  return (
    <div>
      <CategoryButtons />
      <h1 className='Title'>Cover-Ups</h1>
      <Grid
        container
        direction='row'
        alignItems='center'
        className={classes.root}>
        <div className={classes.root}>
          {grabbedCoverups?.map((product, index) => {
            return (
              <ProductCard
                key={index}
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

export default Coverups;
