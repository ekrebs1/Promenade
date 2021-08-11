import React, { useState, useEffect } from "react";
import { getProducts } from "../../api/products";
import CategoryButtons from "./CategoryButtons";
import ProductCard from "./ProductCard";

const Products = ({ cart, setCart }) => {
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
      <div className='productCards'>
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
    </div>
  );
};

export default Products;
