const bcrypt = require("bcrypt");
const { client, pgp, db } = require("./client");
const {
  createProduct,
  getAllProducts,
  getProductByCategory,
} = require("./products");

const {
  createUser,
  getAllUsers,
  createUserAddress,
  createGuest,
} = require("./users");

const { addProductToCart } = require("./user_cart");

const { createUserOrder, updateOrderStatus } = require("./orders");

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
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
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

const createInitialProducts = async () => {
  console.log("Starting to create initial products...");
  try {
    const productsToCreate = [
      {
        name: "Bella Skirt",
        date_created: "2021/02/13",
        description:
          "An effortless cotton tunic with an oversized silhouette. A perfect staple piece for any closet.",
        price: 28.99,
        image_url: "https://i.ibb.co/PthNgk1/promenade-skirt.webp",
        category: "cover-up",
        in_stock: true,
        inventory: 5,
      },
      {
        name: "Dolman Maxi",
        date_created: "2021/03/17",
        description:
          "A throw-on-and-go classic with this maxi dress. It features dolman sleeves with a side slit.",
        price: 38.0,
        image_url: "https://i.ibb.co/tbWJ6tn/promenade-maxi.webp",
        category: "cover-up",
        in_stock: true,
        inventory: 3,
      },
      {
        name: "Floral Kimono",
        date_created: "2021/02/3",
        description:
          "Stay cool in the sun while staying stylish with this lace kimono. You can wear this piece to the beach or out to lunch for the most convertible outfit.   ",
        price: 36.75,
        image_url: "https://i.ibb.co/0rB881r/promenade-kimono.webp",
        category: "cover-up",
        in_stock: false,
        inventory: 0,
      },
      {
        name: "Katie Tunic",
        date_created: "2021/01/23",
        description:
          "This tunic is a customer favorite! The easiest tunic to look great without even trying.",
        price: 30.99,
        image_url: "https://i.ibb.co/Y7hTRgp/promenade-tunic.webp",
        category: "cover-up",
        in_stock: true,
        inventory: 8,
      },
      {
        name: "Moon Tote",
        date_created: "2021/01/26",
        description:
          "The perfect medium sized tote to hold all your summer essentials!",
        price: 24.5,
        image_url: "https://i.ibb.co/fvG31vZ/promenade-circletote.webp",
        category: "bag",
        in_stock: true,
        inventory: 2,
      },
      {
        name: "Lucy Crossbody",
        date_created: "2021/02/16",
        description:
          "A straw crossbody with a button closure to secure your items. The perfect summer purse.",
        price: 21.0,
        image_url: "https://i.ibb.co/k18R63n/promenade-circlepurse.webp",
        category: "bag",
        in_stock: true,
        inventory: 4,
      },
      {
        name: "Abby Satchel",
        date_created: "2021/04/07",
        description:
          "Be free with this boho inspired satchel. This bag features fringe straps and gold hardware for the perfect purse.",
        price: 18.0,
        image_url: "https://i.ibb.co/bg9HDkX/promenade-satchel.webp",
        category: "bag",
        in_stock: true,
        inventory: 8,
      },
      {
        name: "Nina Tote",
        date_created: "2021/05/09",
        description:
          "The perfect tote does exist! Pack all your necessary items in this spacious tote.  ",
        price: 34.99,
        image_url: "https://i.ibb.co/mGKgmWv/promenade-tote.webp",
        category: "bag",
        in_stock: true,
        inventory: 4,
      },
      {
        name: "Erin Hat",
        date_created: "2021/05/12",
        description:
          "Beach hair, don't care! This straw hat will put the finishing touches on any outfit.  ",
        price: 17.99,
        image_url: "https://i.ibb.co/F7YKbdt/promenade-simplehat.webp",
        category: "hat",
        in_stock: true,
        inventory: 1,
      },
      {
        name: "Francesca Hat",
        date_created: "2021/06/22",
        description:
          "Protect yourself from the sun with this wide brim floppy hat. A straw hat with cut out designs to keep cool.   ",
        price: 19.99,
        image_url: "https://i.ibb.co/LZsHZ4n/promenade-strawhat.webp",
        category: "hat",
        in_stock: true,
        inventory: 3,
      },
    ];

    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("Products created!");
    console.log(products);
    console.log("Finished creating products!");
  } catch (err) {
    console.error("There was a problem creating PRODUCTS!");
    throw err;
  }
};

const createInitialUsers = async () => {
  console.log("Starting to create initial users...");
  try {
    const adminUser = {
      username: "administrator",
      password: await bcrypt.hash("admin123", 10),
      email: "admin@gmail.com",
      name: "Admin",
      admin: true,
    };
    await createUser(adminUser);

    const usersToCreate = [
      {
        username: "love2shop",
        password: bcrypt.hashSync("shopper111", 10),
        email: "loves2shop@gmail.com",
        name: "Claire Smith",
      },
      {
        username: "glamgirl",
        password: bcrypt.hashSync("glamour987", 10),
        email: "glamgirl@gmail.com",
        name: "Trinity Thompson",
      },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created!");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("There was a problem creating USERS.");
    throw error;
  }
};

const createInitialGuests = async () => {
  console.log("Starting to create initial guests...");
  try {
    const guestsToCreate = [
      {
        email: "ekrebs1@gmail.com",
        name: "Erica Krebs",
      },
      {
        email: "missbritt@gmail.com",
        name: "Brittany Plank",
      },
    ];

    const guests = await Promise.all(guestsToCreate.map(createGuest));

    console.log("Guests created.");
    console.log(guests);
    console.log("Finished creating GUESTS!");
  } catch (error) {
    console.error("There was a problem creating GUESTS!");
    throw error;
  }
};

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
    await createInitialProducts();
    await createInitialUsers();
    await createInitialGuests();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result:", products);

    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);

    console.log("Calling getProductByCategory");
    const productByCategory = await getProductByCategory("hat");
    console.log("Result:", productByCategory);

    console.log("Calling addProductToCart");
    const userWithProduct = await addProductToCart(2, 1, 2);
    console.log("Result:", userWithProduct);

    console.log("Calling addProductToCart for second product");
    const userSecondProduct = await addProductToCart(2, 10, 1);
    console.log("Result:", userSecondProduct);

    console.log("Calling addProductToCart for different user");
    const secondUserWithProducts = await addProductToCart(3, 7, 1);
    console.log("Result:", secondUserWithProducts);

    console.log("Calling createUserOrder");
    const userOrder = await createUserOrder(2);
    console.log("Results:", userOrder);

    console.log("Calling createUserAddress");
    const userAddress = await createUserAddress({
      user_id: 2,
      street: "87 Wilderness Circle",
      street_2: null,
      state: "Tx",
      zip_code: 70447,
    });
    console.log("Results:", userAddress);

    console.log("Calling updateOrderStatus");
    const orderStatusWithUpdate = await updateOrderStatus(2, {
      status: "processing",
    });
    console.log("Results:", orderStatusWithUpdate);

    console.log("CALLING UPDATED USER INFO");
    const updatedUsers = await getAllUsers();
    console.log("Result:", updatedUsers);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error during testDB!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
