const { client } = require("./client");

async function createProduct({
  name,
  description,
  price,
  image_url,
  category,
  in_stock,
  inventory,
}) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
        INSERT INTO products(
            name, 
            description, 
            price, 
            image_url, 
            category, 
            in_stock, 
            inventory
            ) 
        VALUES($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;      
    `,
      [name, description, price, image_url, category, in_stock, inventory]
    );
    return products;
  } catch (error) {
    console.error("Error with createProducts in db/product");
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM products
      `);
    return rows;
  } catch (error) {
    console.error("Error with getAllProducts in db/product");
    throw error;
  }
}

async function getProductById(product_id) {
  try {
    const {
      rows: [products],
    } = await client.query(`
      SELECT *
      FROM products
      WHERE id=${product_id}
      `);

    if (!products) {
      throw {
        name: "ProductNotFoundError",
        message: "Could not find a product with that id.",
      };
    }
    return products;
  } catch (error) {
    console.error("Error with getProductById in db/product");
    throw error;
  }
}

async function patchProduct(product_id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    if (setString.length > 0) {
      await client.query(
        `
          UPDATE products
          SET ${setString}
          WHERE id=${product_id}
          RETURNING *;
          `,
        Object.values(fields)
      );
    }
    return await getProductById(product_id);
  } catch (error) {
    console.error("Error with patchProduct in db/product");
    throw error;
  }
}

async function getProductByName(name) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM products
      WHERE name= ($1);
      `,
      [name]
    );
    return product;
  } catch (error) {
    console.error("Error getProductByName in db/product.");
    throw error;
  }
}

async function getProductByCategory(category) {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM products
      WHERE category= $1
      `,
      [category]
    );
  } catch (error) {
    console.error("Error getProductByCategory in db/product");
    throw error;
  }
}

module.exports = {
  client,
  createProduct,
  getAllProducts,
  getProductById,
  patchProduct,
  getProductByName,
  getProductByCategory,
};
