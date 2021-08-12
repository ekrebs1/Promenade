const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { requireAdmin, requireUser } = require("../Utils");

const {
  getAllUsers,
  getUserByUsername,
  verifyUniqueUser,
  createUser,
  patchUser,
  deleteUser,
} = require("../../db/users");

//Getting all users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next({ name: "GetAllUsersError", message: "Unable to get all users!" });
  }
});

//Getting user for login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "Invalid",
      message: "Please enter a username and password.",
    });
  }
  try {
    const user = await getUserByUsername(username);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            isAdmin: user.admin,
          },
          process.env.JWT_SECRET
        );
        res.send({
          name: "Success",
          message: "You are now logged in!",
          token,
          user,
        });
      } else {
        next({
          name: "Invalid",
          message: "Invalid username and/or password.",
        });
      }
    } else {
      next({
        name: "Invalid",
        message: "Invalid username and/or password.",
      });
    }
  } catch (error) {
    next(error);
  }
});

//Registering User
usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email, name } = req.body;

  try {
    const existingUser = await verifyUniqueUser(username, email);
    if (existingUser != undefined) {
      if (existingUser.username === username) {
        next({
          name: "UsernameAlreadyExists",
          message: "This username is already in use.",
        });
      } else if (existingUser.email === email) {
        next({
          name: "EmailAlreadyExists",
          message: "This email is already in use.",
        });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser({
        username,
        password: hashedPassword,
        email,
        name,
      });

      const token = jwt.sign(
        {
          id: newUser.id,
          username: newUser.username,
          isAdmin: newUser.admin,
        },
        process.env.JWT_SECRET
      );

      res.send({
        name: "Success",
        message: "You are now registered!",
        token,
      });
    }
  } catch (error) {
    next(error);
  }
});

//administrator preferences // isAdmin toggle status
usersRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { admin } = req.body;
    const fields = {
      admin,
    };
    const updatedUser = await patchUser(id, fields);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

//user preferences // update user info
usersRouter.patch("/me/:if", async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const fields = {};
  if (name) {
    fields.name = name;
  }
  if (email) {
    fields.email = email;
  }

  try {
    const updatedUser = await patchUser(id, fields);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.user.username);
    res.send({
      name: "Success",
      message: "Your account has been found.",
      user,
    });
  } catch ({ name, message }) {
    next({
      name: "FindUserError",
      message: "Unable to find your account.",
    });
  }
});

//Delete User from DB
usersRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    res.send(deletedUser);
  } catch (error) {
    next({
      name: "DeleteError",
      message: "Could not delete user",
    });
  }
});

module.exports = usersRouter;
