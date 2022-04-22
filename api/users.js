const express = require("express");
const usersRouter = express.Router();

const {
  createUser,
  getUser,
  getUserByUsername,
  getUserByUserId,
  //getOrdersByUsername
} = require("../db");

const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");

usersRouter.use('/',(req, res, next) => {
  //console.log("A request is being made to /users");
  res.send('A request is being made to users.');
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({ message: "A user by that username already exists." });
    } else if (password.length < 8) {
      next({ message: "Password must be longer at least 8 characters long." });
    } else {
      const newUser = await createUser({
        username,
        password,
        email
      });

      const token = jwt.sign(
        {
          id: newUser.id,
          username: newUser.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        user: newUser,
        token,
        message: "Thank you for signing up.",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({ message: "Please enter a username and password" });
  }

  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );

      res.send({ user, message: "You're logged in!", token });
    } else {
      next({ message: "Username or password is incorrect." });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    throw error;
  }
});

usersRouter.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await getUserByUsername(username);
    const usersRoutines = await getPublicRoutinesByUser(user);
    res.send(usersRoutines);
  } catch (error) {
    throw error;
  }
});

usersRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await getUserByUserId(userId);
    res.send(user);
  } catch (error) {
    throw error;
  }
  });

  

module.exports = usersRouter;

/*
**does get order by user go in api/orders?**

usersRouter.get("/:username/orders", async (req, res, next) => {
    const { username } = req.params;
    try {
      const user = await getUserByUsername(username);
      const usersOrders = await getOrdersByUsername(user.username);
      res.send(usersOrders);
    } catch (error) {
      throw error;
    }
  });

  */