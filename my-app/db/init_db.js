const { client } = require("./client");

async function buildTables() {
  try {
    client.query(`
        DROP TABLE IF EXISTS order_products;
        DROP TABLE IF EXISTS cart_products;
        DROP TABLE IF EXISTS user_orders;
        DROP TABLE IF EXISTS user_cart;
        DROP TABLE IF EXISTS guests;
        DROP TABLE IF EXISTS user_address;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        `);
    console.log("Starting to build tables...");
    await client.query(`

        CREATE TABLE products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL,
            date_created DATE NOT NULL DEFAULT CURRENT_DATE,
            description VARCHAR(255) NOT NULL,
            price DECIMAL DEFAULT 0,
            image_url VARCHAR(255) NOT NULL,
            category VARCHAR(50) NOT NULL,
            in_stock BOOLEAN DEFAULT true,
            inventory INTEGER NOT NULL,
            active BOOLEAN DEFAULT true
        );

        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            name VARCHAR(50) NOT NULL,
            admin BOOLEAN DEFAULT false,
            UNIQUE(username, email)
        );

        CREATE TABLE user_address(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            street VARCHAR(50) NOT NULL,
            street_2 VARCHAR(50),
            state VARCHAR(2) NOT NULL,
            zip_code INTEGER NOT NULL,
            UNIQUE(user_id)
        );

        CREATE TABLE guests(
            id SERIAL PRIMARY KEY,
            email VARCHAR(50) UNIQUE NOT NULL,
            name VARCHAR(50) NOT NULL,
            UNIQUE(email)
        );

        CREATE TABLE user_cart(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
            active BOOLEAN DEFAULT true,
            UNIQUE(user_id)
        );

        CREATE TABLE user_orders(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            user_cart_id INTEGER REFERENCES user_cart(id) ON DELETE CASCADE,
            status VARCHAR(50),
            UNIQUE(user_id, user_cart_id)
        );

        CREATE TABLE cart_products(
            id SERIAL PRIMARY KEY,
            "user_cart_id" INTEGER REFERENCES user_cart(id) ON DELETE CASCADE,
            "product_id" INTEGER REFERENCES products(id) ON DELETE CASCADE,
            quantity INTEGER NOT NULL,
            active BOOLEAN DEFAULT true,
            UNIQUE("user_cart_id", "product_id")
        );

        CREATE TABLE order_products(
            id SERIAL PRIMARY KEY,
            order_id INTEGER REFERENCES user_orders(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
            quantity INTEGER NOT NULL,
            UNIQUE(order_id, product_id)
        );
        `);
    console.log("Finished building Tables...");
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
  } catch (error) {
    throw error;
  }
}

rebuildDB();
