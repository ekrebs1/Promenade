const { client } = require("./client");

async function createCartItem(user_id, product_id, quantity) {
  try {
    let userCart = await getCartByUserId(user_id);
    if (userCart.length === 0) {
      userCart = await createCart(user_id);

      const {
        rows: [product],
      } = await client.query(
        `
        INSERT INTO cart_products(user_cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_cart_id, product_id) DO NOTHING
        RETURNING *;
      `,
        [userCart.id, product_id, quantity]
      );

      return product;
    }
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO cart_products(user_cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_cart_id, product_id) DO NOTHING
      RETURNING *;
    `,
      [userCart[0].id, product_id, quantity]
    );

    return product;
  } catch (error) {
    console.error("could not create cart item");
    throw error;
  }
}

async function updateCartItemQuantity(user_cart_id, product_id, quantity) {
  try {
    await client.query(
      `
        UPDATE cart_products
        SET $3
        WHERE id=$1 AND product_id=$2
        RETURNING *;
        `,
      [user_cart_id, product_id, quantity]
    );
  } catch (error) {
    console.error("Error with updateCartItemQuantity in db/user_cart.");
    throw error;
  }
}

async function createCart(user_id) {
  try {
    const {
      rows: [userCart],
    } = await client.query(
      `
      INSERT INTO user_cart(user_id)
      VALUES ($1)
      RETURNING *
      `,
      [user_id]
    );
    console.log("NEW CART CREATED");
    return userCart;
  } catch (error) {
    console.error("Error with createCart in db/userCart.");
    throw error;
  }
}

async function getCartByUserId(user_id) {
  try {
    const { rows: userCart } = await client.query(
      `
      SELECT * FROM user_cart
      WHERE user_id=$1 AND active=true
      `,
      [user_id]
    );
    return userCart;
  } catch (error) {
    console.error("Error with getCartByUserId in db/user_cart.");
    throw error;
  }
}

async function addProductToCart(user_id, product_id, quantity) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * 
      FROM products
      WHERE id=$1
      `,
      [product_id]
    );

    await createCartItem(user_id, product.id, quantity);

    return await getUserById(user_id);
  } catch (error) {
    console.error("Error with addProductToCart in db/user_cart.");
    throw error;
  }
}

async function setCartInactive(cart_id) {
  try {
    return await client.query(
      `
        UPDATE user_cart SET active=false
        WHERE user_cart.id=$1
        `,
      [cart_id]
    );
  } catch (error) {
    console.error("Error with setCartInactive in db/user_cart. ");
    throw error;
  }
}

async function getUserById(user_id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * 
        FROM users
        WHERE id=$1
        `,
      [user_id]
    );

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "Could not find a user with that user_id.",
      };
    }

    delete user.password;

    const { rows: products } = await client.query(
      `
    SELECT *
    FROM products
    JOIN cart_products ON products.id=cart_products.product_id
    JOIN user_cart ON cart_products.user_cart_id=user_cart.id
    WHERE user_cart.user_id=$1
    `,
      [user_id]
    );
    user.cart = products;

    const { rows: orderProducts } = await client.query(
      `
    SELECT *
    FROM products
    INNER JOIN order_products ON products.id=order_products.product_id
    INNER JOIN user_orders ON order_products.order_id=user_orders.id
    WHERE user_orders.user_id=$1
    `,
      [user_id]
    );

    if (orderProducts) {
      user.order = orderProducts;
    } else {
      user.order = [];
    }

    const { rows: address } = await client.query(
      `
    SELECT user_address.*
    FROM user_address
    INNER JOIN users ON users.id=user_address.id
    WHERE user_address.user_id=$1
    `,
      [user_id]
    );

    if (address) {
      user.address = address;
    }
    return user;
  } catch (error) {
    console.error("Error with getUserById in db/user_cart");
    throw error;
  }
}

async function deleteCartItem(user_id, product_id) {
  try {
    const userCart = await getCartByUserId(user_id);

    const {
      rows: [deletedItem],
    } = await client.query(
      `
      DELETE FROM cart_products
      WHERE user_cart_id=($1) AND 
      product_id= ($2)
      RETURNING *;
      `,
      [userCart[0].id, product_id]
    );
    return deletedItem;
  } catch (error) {
    console.error("Error with deleteCartItem in db/user_cart.");
    throw error;
  }
}

async function updateProductQuantity(user_id, product_id, quantity) {
  try {
    const userCart = await getCartByUserId(user_id);

    console.log("USER CART!!!!", userCart);
    console.log(quantity, userCart[0].id, product_id);

    const { rows: updatedProduct } = await client.query(
      `
    UPDATE cart_products
    SET quantity=($1)
    WHERE user_cart_id=($2) AND 
    product_id=($3)
    RETURNING *;

    `,
      [quantity, userCart[0].id, product_id]
    );

    return updatedProduct;
  } catch (error) {
    console.error("Error with updateProductQuantity in db/user_cart.");
    throw error;
  }
}

module.exports = {
  client,
  createCartItem,
  updateCartItemQuantity,
  createCart,
  getCartByUserId,
  addProductToCart,
  setCartInactive,
  getUserById,
  deleteCartItem,
  updateProductQuantity,
};
