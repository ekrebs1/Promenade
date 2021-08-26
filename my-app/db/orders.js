const { client, pgp, db } = require("./client");

const { getCartByUserId, setCartInactive } = require("./user_cart");

async function createUserOrder(user_id) {
  try {
    const userCart = await getCartByUserId(user_id);
    if (userCart.length === 0) {
      console.error("Can't create user order without a user cart");
    } else {
      const { rows: createdOrder } = await client.query(
        `
        INSERT INTO user_orders(user_id, user_cart_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, user_cart_id) DO NOTHING
        RETURNING *
      `,
        [user_id, userCart[0].id]
      );
      console.log("NEW ORDER CREATED", createdOrder);
      await setCartInactive(userCart[0].id);
      await addCartProductsToOrderProducts(userCart[0].id, createdOrder[0].id);
      return createdOrder[0].id;
    }
  } catch (error) {
    console.error("could not create user order");
    throw error;
  }
}

async function addCartProductsToOrderProducts(cart_id, order_id) {
  try {
    const { rows: cartProducts } = await client.query(
      `
      SELECT *
      FROM cart_products
      WHERE user_cart_id=$1
      `,
      [cart_id]
    );

    await bulkUpdateOrderProducts(order_id, cartProducts);
    await removeCartItemsOnOrder(cart_id);
  } catch (error) {
    console.error("Error with addCartProductsToOrderProducts in db/orders.");
    throw error;
  }
}

async function removeCartItemsOnOrder(cart_id) {
  await client.query(
    `
    DELETE FROM cart_products
    WHERE user_cart_id=$1
    `,
    [cart_id]
  );
}

async function bulkUpdateOrderProducts(order_id, cartProducts) {
  const newCartProducts = cartProducts.map((cp) => {
    return { order_id, ...cp };
  });
  const cs = new pgp.helpers.ColumnSet(["order_id", "product_id", "quantity"], {
    table: "order_products",
  });
  const query = pgp.helpers.insert(newCartProducts, cs);
  await db.none(query);
}

async function getUserByIdForOrders(user_id) {
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
        message: "Could not find a user with that user_id",
      };
    }

    const { rows: products } = await client.query(
      `
    SELECT *
    FROM products
    INNER JOIN order_products ON products.id=order_products.product_id
    INNER JOIN user_orders ON order_products.order_id=user_orders.id
    WHERE user_orders.user_id=$1
    `,
      [user_id]
    );
    user.order = products;
    return user;
  } catch (error) {
    console.error("Error with getUserByIdForOrders in db/orders.");
    throw error;
  }
}

async function updateOrderStatus(order_id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  console.log("QUERY", order_id, setString, Object.values(fields));

  try {
    if (setString.length > 0) {
      const { rows: update } = await client.query(
        `
          UPDATE user_orders
          SET ${setString}
          WHERE id=${order_id}
          RETURNING *
          `,
        Object.values(fields)
      );

      if (update) {
        return `Successfully updated order status for order ${order_id}.`;
      } else {
        return "Could not update order status.";
      }
    }
  } catch (error) {
    console.error("Error with updateOrderStatus in db/orders");
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows } = await client.query(`
      SELECT user_orders.id, user_orders.status, order_products.quantity, products.name, products.date_created
      FROM user_orders
      INNER JOIN order_products
      ON user_orders.id=order_products.order_id
      INNER JOIN products on order_products.id=products.id;
      `);
    console.log(rows);

    return rows;
  } catch (error) {
    console.error("Error with getAllOrders in db/orders.");
    throw error;
  }
}

module.exports = {
  client,
  pgp,
  db,
  createUserOrder,
  addCartProductsToOrderProducts,
  removeCartItemsOnOrder,
  bulkUpdateOrderProducts,
  getUserByIdForOrders,
  updateOrderStatus,
  getAllOrders,
};
