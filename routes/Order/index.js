const express = require("express");
const orderRouter = express.Router();
const { requireUser } = require("../Utils");
const {
  createUserOrder,
  updateOrderStatus,
  getAllOrders,
} = require("../../my-app/db/orders");
const { getUserById } = require("../../my-app/db/user_cart");

//get user orders
orderRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const data = await getUserById(id);
    res.send(data.order);
  } catch ({ name, message }) {
    next({
      name: "OrderError",
      message: "Could not find user orders!",
    });
  }
});

//create new order for user
orderRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const newOrder = await createUserOrder(req.user.id);
    await updateOrderStatus(newOrder, {
      status: "Order Created",
    });
    res.send({
      name: "Success!",
      message: "A new order has been created!",
    });
  } catch ({ name, message }) {
    next({
      name: "NewOrderError",
      message: "Could not create a new order!",
    });
  }
});

//admin preferences // update order status
orderRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const newOrderStatus = await updateOrderStatus(id, req.body);
    res.send({
      name: "UpdatedStatus",
      message: "Order status has been updated!",
      newOrderStatus,
    });
  } catch (error) {
    next({
      name: "StatusError",
      message: "Could not update order status!",
    });
  }
});

//admin preferences // all orders
orderRouter.get("/all", async (req, res, next) => {
  try {
    const allOrders = await getAllOrders();
    res.send({
      name: "Success!",
      message: "All orders have been found.",
      allOrders,
    });
  } catch (error) {
    next({
      name: "AllOrdersError",
      message: "Could not find all orders!",
    });
  }
});

module.exports = orderRouter;
