import React, { useState } from "react";
import { createNewProduct } from "../api";
import "./form.css";

const CreateForm = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quanitity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
  const [inventory, setInventory] = useState(null);

  async function handleSubmit() {
    await createProduct(
      name,
      description,
      price,
      quantity,
      category,
      inventory
    );
  }

  return (
    <div className="form-container">
      <h1 className="form-header">CREATE A PRODUCT</h1>
      <div>
        <form>
          <input
            placeholder="Name..."
            required
            onChange={(event) => setName(event.target.value)}
          />

          <input
            placeholder="Description"
            required
            onChange={(event) => setMainLink(event.target.value)}
          />

          <input
            placeholder="Price in Dollars"
            required
            onChange={(event) => setComment(event.target.value)}
          />

          <input
            placeholder="Quantity"
            required
            onChange={(event) => setTags(event.target.value)}
          />

          <input
            placeholder="Category"
            required
            onChange={(event) => setTags(event.target.value)}
          />

          <input
            placeholder="Inventory"
            required
            onChange={(event) => setTags(event.target.value)}
          />

          <button className="sub-btn" onClick={handleSubmit}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
