const express = require("express");
const { deleteCartItem, updateCartItemWithOrderId } = require("../db");
const {
  createCartItem,
  getCartByUser,
  getAllCartItems,
  deleteCartItems,
} = require("../db");
const cartsRouter = express.Router();
const { requireUser } = require("./utils");

//get cart items for specific user
cartsRouter.get("/:usersId", async (req, res, next) => {
  const { usersId } = req.params;

  try {
    const allCartItemsByUser = await getCartByUser(usersId);
    res.send(allCartItemsByUser);
  } catch (error) {
    next(error);
  }
});

//get cart items of user
cartsRouter.get("/", async (req, res, next) => {
  try {
    const cartItems = await getAllCartItems();
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

//add item to cart
cartsRouter.post("/", async (req, res, next) => {
  const { quantity, productId, usersId } = req.body;

  try {
    const createdCartItem = await createCartItem({
      quantity,
      productId,
      usersId,
    });
    res.json(createdCartItem);
  } catch (error) {
    next({
      name: "CartError",
      message: "Could not add product to cart",
      error,
    });
  }
});

//update cart item
cartsRouter.patch(
  "/:cartId",
  // requireUser,
  async (req, res, next) => {
    const { cartId } = req.params;
    const { orderId } = req.body;
    try {
      const updatedCartItem = await updateCartItemWithOrderId({
        cartId,
        orderId,
      });
      res.send(updatedCartItem);
    } catch (error) {
      next(error);
    }
  }
);

//delete cart item
cartsRouter.delete(
  "/:id",
  // requireUser,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedCartItem = await deleteCartItem(id);
      res.send(deletedCartItem);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = cartsRouter;
