const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db");

//Routers
const apiRouter = express.Router();
const usersRouter = require("../src/api/users");
const productsRouter = require("./products");
const ordersRouter = require("./orders");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { parsedToken } = jwt.verify(token, JWT_SECRET);
      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationError",
      message: `No token authorization header.`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
