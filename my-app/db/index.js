const { client, db } = require("./client");

const { products } = require("./products");

const { users } = require("./users");

const { user_cart } = require("./user_cart");

module.exports = {
  client,
  db,
  products,
  users,
  user_cart,
};
