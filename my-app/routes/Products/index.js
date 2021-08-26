const express = require("express");
const productsRouter = express.Router();
const { requireAdmin } = require("../Utils/index");
const {
  getAllProducts,
  getProductByName,
  createProduct,
  patchProduct,
} = require("../../db/products");

//get all products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next({
      name: "GetAllProductsError",
      message: "Unable to get all products!",
    });
  }
});

//Admin Preferences // Add a product
productsRouter.post("/", async (req, res, next) => {
  try {
    const existingProduct = await getProductByName(req.body.name);
    if (existingProduct) {
      next({
        name: "ExistingProduct",
        message: "A product with this name already exists!",
      });
    }
    const { name, description, price, image_url, category } = req.body;
    const newProduct = await createProduct(req.body);
    res.send({
      name: "Success!",
      message: "New Product Created!",
      newProduct,
    });
  } catch ({ name, message }) {
    next({
      name: "ProductError",
      message: "Could not create new product!",
    });
  }
});

//Admin Preferences // Edit Products
productsRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await patchProduct(id, req.body);
    res.send({
      name: "Success!",
      message: "Product successfully updated!",
      updatedProduct,
    });
  } catch ({ name, message }) {
    next({
      name: EditError,
      message: "Product could not be updated!",
    });
  }
});

module.exports = productsRouter;
