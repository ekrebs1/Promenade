import React, { useState, useEffect } from "react";
import { updateUser, getAllUsers } from "../../api/index";

import "./form.css";

const Users = () => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [address, setAdress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isUser, setIsUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(async () => {
    const data = await getAllUsers();
    console.log(data, "users data !!!!!!!!!!!!!!");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {
      email,
      username,
      password,
      address,
      city,
      state,
      zip,
      isAdmin,
      isUser,
    };
    console.log(user, "handle submit USERS");
    await updateUser(user);
  }

  return (
    <div className="form-container">
      <h1 className="form-header">UPDATE USER</h1>
      <div>
        <form>
          <input
            placeholder="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            placeholder="Username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />

          <input
            placeholder="address"
            required
            onChange={(event) => setAdress(event.target.value)}
          />

          <input
            placeholder="City"
            required
            onChange={(event) => setCity(event.target.value)}
          />

          <input
            placeholder="State"
            required
            onChange={(event) => setState(event.target.value)}
          />
          <input
            placeholder="Zip"
            required
            onChange={(event) => setZip(event.target.value)}
          />
          <input
            placeholder="isAdmin"
            required
            onChange={(event) => setIsAdmin(event.target.value)}
          />
          <input
            placeholder="isUser"
            required
            onChange={(event) => setIsUser(event.target.value)}
          />

          <button className="sub-btn" onClick={handleSubmit}>
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Users;
