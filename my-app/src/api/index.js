import axios from "axios";

//PRODUCTS************

export async function allProducts() {
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

export async function createProduct(
  name,
  description,
  image_url,
  price,
  quantity,
  category,
  inventory
) {
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

    return data;
  } catch (error) {
    throw error;
  }
}
