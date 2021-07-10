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

export async function getAllCartItems() {
  try {
    const { data } = await axios.get("/api/carts");
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function createProduct({
//   img_url,
//   name,
//   description,
//   price,
//   quantity,
//   category,
// }) {
//   try {
//     const { data } = await axios.post("/api/products", {
//       img_url,
//       name,
//       description,
//       price,
//       quantity,
//       category,
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function addCartItem(quantity, productId, usersId) {
  try {
    console.log({
      quantity: quantity,
      productId: productId,
      usersId: usersId,
      ordersId: null,
    });
    const { data } = await axios.post("/api/carts/cartPost", {
      quantity: quantity,
      productId: productId,
      usersId: usersId,
      ordersId: null,
    });
    // .then(
    //   (response) => {
    //     console.log(response);
    //   },
    return data;
  } catch (err) {
    console.error(err);
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

export async function getUsersCurrentCartItems(usersId) {
  try {
    const { data } = await axios.get(`/api/carts/${usersId}`);
    console.log(
      data,
      "THIS IS WHAT THE BACKEND IS RETURNING FRO CART ITEMS BY USERS"
    );
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

export async function updateUser(userId, fields = {}) {
  try {
    const { data } = await axios.patch(`/api/users`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  return await axios
    .post('/api/users/login', {
      username,
      password,
    })
    .then(({ data: { token } }) => {
      if (token) {
        storeCurrentUser();
        window.location.href = '/api/home';
      } else {
        console.error('Something went wrong');
      }
    })
    .catch((error) => {
      console.log(error);
      console.error('Something went wrong');
    });
}
