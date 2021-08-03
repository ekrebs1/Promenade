const apiRouter = require("express").Router();
const usersRouter = require("./Users");
const productsRouter = require("./Products");
const cartRouter = require("./Cart");
const orderRouter = require("./Order");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationError",
      message: "Incorrect Authorization Header",
    });
  }
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/order", orderRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
