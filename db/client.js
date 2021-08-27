//DB Connection
const { Client } = require("pg");
const DB_NAME = "localhost:5432/promenade";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const pgp = require("pg-promise")({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
});
const db = pgp(DB_URL);

module.exports = {
  client,
  pgp,
  db,
};
