const { client, db, pgp } = require("./client");

const { products } = require("./products");

const { users } = require("./users");

const { user_cart } = require("./user_cart");

const { orders } = require("./orders");

module.exports = {
  client,
  db,
  pgp,
  products,
  users,
  user_cart,
  orders,
};
