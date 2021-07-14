import axios from "axios";
import { storeCurrentUser } from "../auth";

//PRODUCTS************

export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateQuantity(id, quantity) {
  try {
    const { data } = await axios.patch(`/api/products/${id}/${quantity}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(productId) {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const data = await axios.delete(`/api/products/${id}`, {
      header: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createProduct({
  name,
  description,
  image_url,
  price,
  quantity,
  category,
  inventory,
}) {
  try {
    const { data } = await axios.post("/api/products", {
      name,
      description,
      image_url,
      price,
      quantity,
      category,
      inventory,
    });
    console.log(data, "helper method in API!!!!!!!!!!!!!!!!");
    return data;
  } catch (error) {
    throw error;
  }
}

//CARTS*******
export async function updateProductQuantity(productId, quantity, usersId) {
  try {
    const { data } = await axios.patch(`/api/carts/${productId}`, {
      quantity,
      usersId,
    });
    return data;
  } catch (error) {
    console.error("Error updating quantity");
  }
}

export async function getAllCartItems() {
  try {
    const { data } = await axios.get("/api/carts");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addCartItem(quantity, productId, usersId) {
  try {
    console.log({
      quantity: quantity,
      productId: productId,
      usersId: usersId,
    });
    const { data } = await axios.post("/api/carts", {
      quantity: quantity,
      productId: productId,
      token: usersId,
    });

    return data;
  } catch (err) {
    console.error("Error adding to cart");
  }
}

export async function deleteCartItem(id) {
  try {
    const { data } = await axios.delete(`/api/carts/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCart(usersId) {
  try {
    const { data } = await axios.get("/api/carts", {
      usersId,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error getting cart");
  }
}

export async function updateCartItemsQuantityMinus(id) {
  try {
    const { data } = await axios.patch(`api/cartItems/${id}/quantityMinus`);
    return data;
  } catch (error) {}
}

export async function updateCartItemsQuantityPlus(id) {
  try {
    const { data } = await axios.patch(`api/cartItems/${id}/quantityPlus`);
    return data;
  } catch (error) {}
}

export async function getUsersCurrentCartItems(usersId) {
  try {
    const { data } = await axios.get(`/api/carts/${usersId}`);
    console.log(data, "BACKEND DATA FOR THE CART ITEMS!!!!!!!");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addOrderIdToCartItems(id, orderId) {
  try {
    const { data } = await axios.patch(`api/carts/${id}`, {
      orderId,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrder() {
  try {
    const { data } = await axios.get("/api/orders");
    return data.orders;
  } catch (error) {
    throw error;
  }
}

export async function createOrder(usersId, date_ordered, total_price) {
  try {
    const { data } = await axios.post("/api/orders", {
      usersId,
      date_ordered,
      total_price,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(usersId, fields = {}) {
  try {
    const { data } = await axios.patch(`/api/users`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function myUserId(myToken) {
  try {
    const { data } = await axios.get(`/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    console.log(data, "THIS IS MY USER DATA API HELPER FUNCTION");
    return data;
  } catch (error) {
    console.error(error, "ERROR CURRENT USER INFO API");
  }
}
