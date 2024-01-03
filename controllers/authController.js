const bcrypt = require("bcrypt");
const User = require("../models/user");

const authController = {
  signup: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).send("Username and password are required.");
      }

      const newUser = new User({
        username,
        password,
      });

      await newUser.save();

      res.status(201).send("User created successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).send("Invalid username or password.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).send("Invalid username or password.");
      }

      req.session.user = user;

      res.status(200).send("Login successful.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      res.clearCookie("connect.sid");
      res.status(200).send("Logout successful.");
    });
  },

  dashboard: (req, res) => {
    if (!req.session.user) {
      return res.status(401).send("Unauthorized");
    }

    res.status(200).send(`Welcome, ${req.session.user.username}!`);
  },
};

module.exports = authController;
