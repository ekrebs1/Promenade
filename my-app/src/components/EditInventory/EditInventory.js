import React, { useState } from "react";
import { updateProduct } from "../../api/index";
import "./form.css";

const EditInventory = () => {
  // const [name, setName] = useState(null);
  // const [description, setDescription] = useState(null);
  // const [price, setPrice] = useState(null);
  // const [quantity, setQuantity] = useState(null);
  // const [image_url, setImage_url] = useState(null);
  // const [category, setCategory] = useState(null);
  const [inventory, setInventory] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const product = {
      name,
      description,
      price,
      quantity,
      image_url,
      category,
      inventory,
    };
    console.log(product, "handle submit");
    await createProduct(product);
  }

  return (
    <div className="form-container">
      <h1 className="form-header">ADD OR MODIFY PRODUCT</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name..."
            required
            onChange={(event) => setName(event.target.value)}
          />

          <input
            placeholder="Description"
            required
            onChange={(event) => setDescription(event.target.value)}
          />

          <input
            placeholder="Price in Dollars"
            required
            onChange={(event) => setPrice(event.target.value)}
          />

          <input
            placeholder="Image"
            required
            onChange={(event) => setImage_url(event.target.value)}
          />

          <input
            placeholder="Category"
            required
            onChange={(event) => setCategory(event.target.value)}
          />

          <input
            placeholder="Inventory"
            required
            onChange={(event) => setInventory(event.target.value)}
          />

          <button className="sub-btn" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditInventory;
