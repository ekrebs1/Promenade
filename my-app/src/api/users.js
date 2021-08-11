import axios from "axios";
import { setToken } from "./utils";

export async function getUsers() {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function userLogin(username, password) {
  try {
    const { data } = await axios.post("/api/users/login", {
      username,
      password,
    });

    if (data.token) {
      alert("You are now logged in!");
      setToken(data.token);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function userRegister(name, email, username, password) {
  try {
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      username,
      password,
    });

    if (data.token) {
      setToken(data.token);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeAdmin(id, admin) {
  try {
    let updatedInfo = {
      admin,
    };

    const { data } = await axios.patch(`/api/users/${id}`, updatedInfo);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function editUser(id, name, email) {
  try {
    let updatedInfo = {};
    let newName = prompt("What would you like to change your name to?", name);
    let newEmail = prompt(
      "What would you like to change your email to?",
      email
    );

    if (newName) {
      updatedInfo.name = newName;
    }
    if (newEmail) {
      updatedInfo.email = newEmail;
    }

    const { data } = await axios.patch(`/api/users/me/${id}`, updatedInfo);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMyAccount(token) {
  try {
    const { data } = await axios.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.user;
  } catch (error) {
    throw error;
  }
}

// export async function removeUser(id, token) {
//   try {
//     const { data } = await axios.delete(`/api/users/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return data;
//   } catch (error) {
//     throw data;
//   }
// }
