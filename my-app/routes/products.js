const express = require("express");
const productsRouter = express.Router();
const {
  getAllProducts,
  createProduct,
  productByCategory,
  getProductById,
  deleteProduct,
} = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:ingredientId/product", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const products = await getProductbyId(productId);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { name, description } = req.body;

  try {
    const newProduct = await updateProduct({ id, name, description });
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  const { name, description, price, quantity, category, inventory } = req.body;
  const newProduct = {};
  try {
    (newProduct.name = name),
      (newProduct.description = description),
      (newProduct.price = price),
      (newProduct.quantity = quantity),
      (newProduct.category = category),
      (newProduct.inventory = inventory);

    const theNewProduct = await createProduct(newProduct);

    res.send(theNewProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  const productId = req.params.id;
  try {
    const deleteProduct = await deleteProduct(productId);
    res.send(deleteProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:categoryName", async (req, res, next) => {
  const { categoryName } = req.params;

  try {
    const productsByCategory = await productByCategory(categoryName);

    res.send(productsByCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
