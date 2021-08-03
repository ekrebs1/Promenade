const express = require("express");
const cartRouter = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(`${process.env.STRIPE_API_KEY}`);
const { requireUser } = require("../Utils");
const {
  getUserById,
  addProductToCart,
  deleteCartItem,
  updateProductQuantity,
} = require("../../db/user_cart");
const { createUserOrder } = require("../../db/orders");

//get a users cart
cartRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await getUserById(id);
    res.send(user.cart);
  } catch ({ name, message }) {
    next({
      name: "CartError",
      message: "Could not get user cart!",
    });
  }
});

//user add a product to cart
cartRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { product_id, quantity } = req.body;
    const addedProduct = await addProductToCart(id, product_id, quantity);
    res.send(addedProduct);
  } catch (error) {
    next({
      name: "CartError",
      message: "Error adding product to cart!",
    });
  }
});

//user delete cart item
cartRouter.delete("/:productId", requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const deletedItem = await deleteCartItem(id, productId);
    res.send(deletedItem);
  } catch (error) {
    next({
      name: "CartError",
      message: "Could not delete product from cart!",
    });
  }
});

//user update quantity in cart
cartRouter.patch("/:productId", requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const { quantity } = req.body;
    const updatedProduct = await updateProductQuantity(id, productId, quantity);
    res.send(updatedProduct);
  } catch (error) {
    next({
      name: "CartError",
      message: "Could not update product quantity in cart!",
    });
  }
});

//user checkout with Stripe
cartRouter.post("/checkout", async (req, res) => {
  try {
    if (req.user) {
      await createUserOrder(req.user.id);
    }
    const cartItems = req.body;
    const line_items = [];
    cartItems.forEach((item) => {
      const { name, price, quantity } = item;
      const formatPrice = parseInt(price.replace(".", ""));
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name,
          },
          unit_amount: formatPrice,
        },
        quantity,
      });
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.STRIPE_REDIRECT}/orderSuccess`,
      cancel_url: `${process.env.STRIPE_REDIRECT}/cart`,
    });
    res.send(session.url);
  } catch (error) {
    next({
      name: "CartError",
      message: "Could not complete checkout!",
    });
  }
});

module.exports = cartRouter;
