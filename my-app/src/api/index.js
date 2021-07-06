import axios from "axios";

export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
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

export async function createNewProduct(
  name,
  description,
  price,
  quantity,
  category,
  inventory
) {
  try {
    const { data } = await axios.post("/api/products", {
      name,
      description,
      price,
      quantity,
      category,
      inventory,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
