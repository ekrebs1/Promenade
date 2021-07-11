const {
  client,
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  getUserByUsername,
  createOrder,
  getOrderById,
  getAllOrders,
  getOrderByUser,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  productByCategory,
} = require("./index");
``;
async function buildTables() {
  try {
    console.log("Starting to drop tables...");
    client.query(`
     DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
         `);
    console.log("Finished dropping tables!");
    console.log("Starting to build tables...");
    await client.query(`
    
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            username VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false,
            "isUser" BOOLEAN DEFAULT false
        );
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          date_ordered VARCHAR(255) NOT NULL,
          total_price DECIMAL,
          "usersId" INTEGER REFERENCES users(id)
        );
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name varchar(30) UNIQUE,
            description VARCHAR(255),
            image_url TEXT NOT NULL,
            price varchar(30),
            quantity INTEGER,
            category text,
            inventory varchar(30)
      );
      CREATE TABLE carts(
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id),
          "usersId" INTEGER REFERENCES users(id),
          UNIQUE("productId", "orderId", "usersId")
        );
      `);
    console.log("Finished building tables!");
  } catch (error) {
    throw error;
  }
}
async function populateInitialProducts() {
  try {
    console.log("starting to create products...");
    const productsToCreate = [
      {
        id: 1,
        name: "Product 1",
        description: "some type of alcohol",
        image_url: "https://picsum.photos/200/300",
        price: "12.99",
        quantity: 2,
        category: "vodka",
        inventory: "21",
      },
      {
        id: 2,
        name: "Product 2",
        description: "another alcohol",
        image_url: "https://picsum.photos/200/300",
        price: "22.5",
        quantity: 1,
        category: "whiskey",
        inventory: "14",
      },
      {
        id: 3,
        name: "Product 3",
        description: "some description",
        image_url: "https://picsum.photos/200/300",
        price: "14.0",
        quantity: 2,
        category: "gin",
        inventory: "30",
      },
    ];
    const theProducts = await Promise.all(
      productsToCreate.map((product) => createProduct(product))
    );
    console.log("Products Created: ", theProducts);
    console.log("Finished creating products.");
  } catch (error) {
    throw error;
  }
}
async function populateInitialUsers() {
  try {
    console.log("starting to create users...");
    const usersToCreate = [
      {
        email: "admin@gmail.com",
        name: "Tonya Green",
        password: "admin123",
        username: "administrator",
        address: "1 ruby road",
        city: "Houston",
        state: "TX",
        zip: "12345",
        isAdmin: true,
        isUser: true,
      },
      {
        email: "newbie@gmail.com",
        name: "Jason Hill",
        password: "test123",
        username: "hills5",
        address: "39 circle rd",
        city: "mandeville",
        state: "LA",
        zip: "70448",
        isUser: true,
      },
      {
        email: "chris.scott@gmail.com",
        name: "Chris Scott",
        password: "hellothere",
        username: "scott.c",
        address: "123 wilderness rd",
        city: "covington",
        state: "LA",
        zip: "70447",
        isUser: true,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("User Created: ", users);
    console.log("Finished creating users.");
  } catch (error) {
    throw error;
  }
}
async function populateInitialOrders() {
  try {
    console.log("starting to create orders...");
    const ordersToCreate = [
      {
        date_ordered: "11/22/2020",
        total_price: 32.99,
      },
      {
        date_ordered: "05/04/2021",
        total_price: 23.1,
      },
      {
        date_ordered: "08/15/2021",
        total_price: 38.85,
      },
    ];
    const theOrders = await Promise.all(
      ordersToCreate.map((order) => createOrder(order))
    );
    console.log("orders Created: ", theOrders);
    console.log("Finished creating orders.");
  } catch (error) {
    throw error;
  }
}
async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
    await populateInitialProducts();
    await populateInitialUsers();
    await populateInitialOrders();
    await getAllOrders();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}
async function testDB() {
  try {
    console.log("starting to build tables in rebuildDB");
    await buildTables();
    console.log("starting to populate initial products in rebuildDB");
    await populateInitialProducts();
    console.log("starting to populate initial Users in rebuildDB");
    await populateInitialUsers();
    console.log("starting to populate initial orders in rebuildDB");
    await populateInitialOrders();
    console.log("Starting to test database...");
    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);
    console.log("Calling getUserByEmail with 1");
    const singleEmail = await getUserByEmail(users[1].email);
    console.log("Result:", singleEmail);
    console.log("Calling getUserById with 1");
    const singleUser = await getUserById(1);
    console.log("Result:", singleUser);
    console.log("Calling update user");
    const updatedUserData = await updateUser(users[0].id, {
      username: "hilly",
    });
    console.log("Result:", updatedUserData);
    console.log("Calling getUserByUsername with 1");
    const username = await getUserByUsername(users[1].username);
    console.log("Result:", username);

    console.log("Starting to test products...");
    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result:", products);
    console.log("Calling getProductById with 1");
    const singleProduct = await getProductById(1);
    console.log("Result:", singleProduct);
    console.log("Calling updateProduct on product[0]");
    const updatedProduct = await updateProduct(products[0].id, {
      name: "New Product",
      description: "Updated description",
    });
    console.log("Result:", updatedProduct);
    // console.log("Testing delete product");
    // const deleteProduct = await deleteProduct(2);
    // console.log("Result: product deleted", deleteProduct);
    console.log("Calling getProductByCategory");
    const productsWithVodka = await productByCategory("vodka");
    console.log("Result:", productsWithVodka);
    console.log("Calling getOrderById");
    const orderId = await getOrderById(2);
    console.log("Result:", orderId);
    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}
rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
