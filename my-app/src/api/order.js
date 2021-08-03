import axios from "axios";

export async function createUserOrder(token) {
  try {
    const order = await axios.post(
      `/api/order`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return order;
  } catch (error) {
    throw error;
  }
}

export async function getAllUserOrders(token) {
  try {
    const { data } = await axios.get("/api/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const orders = [];

    data.forEach((el, index) => {
      if (orders.some((order) => order.id === el.id)) {
        const orderIndex = orders.findIndex((e) => e.id === el.id);
        orders[orderIndex].products.push(el);
      } else {
        orders.push({
          id: el.id,
          status: el.status,
          products: [
            {
              name: el.name,
              quantity: el.quantity,
            },
          ],
        });
      }
    });
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const { data } = await axios.get("/api/order/all");
    const orders = [];
    data.forEach((el, index) => {
      if (orders.some((order) => order.id === el.id)) {
        const orderIndex = orders.findIndex((e) => e.id === el.id);
        orders[orderIndex].products.push(el);
      } else {
        orders.push({
          id: el.id,
          status: el.status,
          products: [
            {
              name: el.name,
              quantity: el.quantity,
            },
          ],
        });
      }
    });
    return orders;
  } catch (error) {
    throw error;
  }
}
