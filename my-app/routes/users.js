const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
} = require("../db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// const { requireUser, requireAdmin } = require("./utils");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

usersRouter.post("/register", async (req, res, next) => {
  const { email, username, password, address, city, state, zip } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      throw Error("Username already exists.");
    }
    if (password.length < 6) {
      throw Error("Password must be at least 8 characters long.");
    }
    const user = await createUser({
      email,
      username,
      password,
      address,
      city,
      state,
      zip,
    });
    if (!user) {
      throw Error(`Error creating user.`);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        message: "You have successfully registered!",
        user,
        token,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  try {
    const user = await getUserByUsername(username);
    console.log(user, "Routes''''''");
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET
        );

        res.send({ message: "You are now logged in!", token, user });
      } else {
        next({
          name: "InvalidInfo",
          message: "Invalid credentials, please check username and password",
        });
      }
    } else {
      next({
        name: "InvalidInfo",
        message: "Invalid credentials, please check username and password",
      });
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.patch(
  "/user/:id",
  // requireUser,
  async (req, res, next) => {
    const { id } = req.params;
    const { email, username, password, address, city, state, zip } = req.body;

    const updateFields = {};

    if (email) {
      updateFields.email = email;
    }
    if (username) {
      updateFields.username = username;
    }
    if (password) {
      updateFields.password = password;
    }
    if (address) {
      updateFields.address = address;
    }
    if (city) {
      updateFields.city = city;
    }
    if (state) {
      updateFields.state = state;
    }
    if (zip) {
      updateFields.zip = zip;
    }

    try {
      const _user = await getUserById(id);
      if (!_user) {
        throw Error("User not found.");
      }
      const updatedUser = await updateUser(id, updateFields);
      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get(
  "/me",
  // requireUser,
  async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

usersRouter.get(
  "/",
  // requireAdmin,
  async (req, res) => {
    const users = await getAllUsers();
    res.send({
      users,
    });
  }
);

module.exports = usersRouter;
