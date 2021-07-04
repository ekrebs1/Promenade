const express = require("express");
const { deleteCartItem } = require("../db");
const { createCartItem, getCartByUser, getAllCartItems } = require("../db");
const cartsRouter = express.Router();
const { requireUser } = require("./utils");

cartsRouter.get("/:usersId", async (req, res, next) => {
  const { usersId } = req.params;

  try {
    const allCartItemsByUser = await getCartByUser(usersId);
    res.send(allCartItemsByUser);
  } catch (error) {
    next(error);
  }
});

cartsRouter.get("/", async (req, res, next) => {
  try {
    const cartItems = await getAllCartItems();
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

cartsRouter.post("/carts", async (req, res, next) => {
  const { productId, usersId } = req.body;

  try {
    const createdCartItem = await createCartItem({
      productId,
      usersId,
    });
    res.json(createdCartItem);
  } catch (error) {
    next(error);
  }
});

cartsRouter.patch("/:cartId", requireUser, async (req, res, next) => {
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
});

cartsRouter.delete("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCartItem = await deleteCartItem(id);
    res.send(deletedCartItem);
  } catch (error) {
    next(error);
  }
});
module.exports = cartsRouter;
