import axios from "axios";

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const loggedAdmin = () => {
  localStorage.setItem("admin", "isAdmin");
};

export const clearAdmin = () => {
  localStorage.removeItem("admin");
};

export async function getProducts() {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createProduct(
  name,
  description,
  price,
  image_url,
  category
) {
  try {
    const { data } = await axios.post("/api/products", {
      name,
      description,
      price,
      image_url,
      category,
    });
    alert("Product successfully added");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProductQuantity(product_id, quantity, token) {
  try {
    const { data } = await axios.patch(
      `/api/cart/${product_id}`,
      { quantity },
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

export async function updateProduct(product_id, fields, token) {
  try {
    const updatedProduct = await axios.patch(
      `/api/products/${product_id}`,
      fields,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Product has been updated!");
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}
