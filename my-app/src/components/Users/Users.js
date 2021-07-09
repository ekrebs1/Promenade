// import React, { useState } from "react";
// import { updateUser } from "../../api/index";
// import "./form.css";

// const Users = () => {
//   const [email, setName] = useState(null);
//   const [description, setDescription] = useState(null);
//   const [price, setPrice] = useState(null);
//   const [quantity, setQuantity] = useState(0);
//   const [image_url, setImage_url] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [inventory, setInventory] = useState(null);

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const user = {
//       email,
//       username,
//       password,
//       address,
//       city,
//       state,
//       zip,
//       isAdmin = false,
//       isUser = false,
//     };
//     console.log(user, "handle submit");
//     await updateUser(user);
//   }

//   return (
//     <div className="form-container">
//       <h1 className="form-header">CREATE A PRODUCT</h1>
//       <div>
//         <form>
//           <input
//             placeholder="Name..."
//             required
//             onChange={(event) => setName(event.target.value)}
//           />

//           <input
//             placeholder="Description"
//             required
//             onChange={(event) => setDescription(event.target.value)}
//           />

//           <input
//             placeholder="Price in Dollars"
//             required
//             onChange={(event) => setPrice(event.target.value)}
//           />

//           <input
//             placeholder="Image"
//             required
//             onChange={(event) => setImage_url(event.target.value)}
//           />

//           <input
//             placeholder="Category"
//             required
//             onChange={(event) => setCategory(event.target.value)}
//           />

//           <input
//             placeholder="Inventory"
//             required
//             onChange={(event) => setInventory(event.target.value)}
//           />

//           <button className="sub-btn" onClick={handleSubmit}>
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateForm;
