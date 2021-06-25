const {
  client,
  createProduct,
  getAllProducts,
  getProductById,
  getProductByCategory,
  patchProduct,
  createUser,
  getAllUsers,
  patchUser,
  addProductToCart,
} = require("./index");
``;

async function buildTables() {
  try {
    client.query(`
        DROP TABLE IF EXISTS user_cart;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
      `);

    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        price DECIMAL DEFAULT 0,
        image_url TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        quantity INTEGER DEFAULT 0,
        inventory INTEGER DEFAULT 0
        
        
      );
       CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        guest BOOLEAN DEFAULT TRUE,
        cart TEXT [],
        UNIQUE(username, email)
      );
      CREATE TABLE user_cart(
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id),
        UNIQUE(user_id, product_id)
      );
      `);
    console.log("Finished building tables...");
  } catch (error) {
    throw error;
  }
}

const createInitialProducts = async () => {
  console.log("Starting to create initial products...");
  try {
    const productsToCreate = [
      {
        name: "product test 1",
        description: "Description...",
        price: 22.5,
        image_url: "https://picsum.photos/200/300",
        category: "vodka",
        quantity: 2,
        inventory: 5,
      },
      {
        name: "product test 2",
        description: "Description...",
        price: 14.99,
        image_url: "https://picsum.photos/200/300",
        category: "gin",
        quantity: 1,
        inventory: 6,
      },
      {
        name: "product test 3",
        description: "Description...",
        price: 21.99,
        image_url: "https://picsum.photos/200/300",
        category: "whiskey",
        quantity: 1,
        inventory: 7,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");
  } catch (err) {
    console.error("There was a problem creating PRODUCTS");
    throw err;
  }
};

const createInitialUsers = async () => {
  console.log("Starting to create initial users...");
  try {
    const usersToCreate = [
      {
        username: "test",
        password: "test123",
        email: "hello@gmail.com",
        name: "Danielle Scott",
        admin: "true",
      },
      {
        username: "Ali123",
        password: "hellothere",
        email: "ali123@gmail.com",
        name: "Ali Miles",
        admin: "false",
      },
      {
        username: "testing123",
        password: "testing567",
        email: "testing123@gmail.com",
        name: "test",
        admin: "false",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (err) {
    console.error("There was a problem creating USERS");
    throw err;
  }
};

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
    await createInitialProducts();
    await createInitialUsers();
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
    const productByCategory = await getProductByCategory("whiskey");
    console.log("Result:", productByCategory);

    console.log("Calling addProductToCart");
    const userWithProduct = await addProductToCart(1, 1);
    console.log("Result:", userWithProduct);

    console.log("Calling addProductToCart");
    const userWithThirdProduct = await addProductToCart(2, 3);
    console.log("Result:", userWithThirdProduct);

    console.log("Calling patchProduct");
    const updatedProduct = await patchProduct(1, {
      name: "updated product",
      inventory: 20,
    });
    console.log("Result:", updatedProduct);

    console.log("Calling patchUser");
    const updatedUser = await patchUser(1, {
      name: "Jenny Roy",
      username: "coder567",
    });
    console.log("Result:", updatedUser);

    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
