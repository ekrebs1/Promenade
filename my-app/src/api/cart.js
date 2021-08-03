import axios from "axios";

export async function getCart(token) {
  try {
    const { data } = await axios.get("api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeItemFromCart(product_id, token) {
  try {
    const { data } = await axios.delete(`/api/cart/${product_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addItemToCart(product_id, quantity, token) {
  try {
    const { data } = await axios.post(
      `/api/cart`,
      { product_id, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function checkoutUser(cart) {
  try {
    const { data } = await axios.post("/api/cart/checkout", cart);
    return data;
  } catch (error) {
    throw error;
  }
}
