const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Controllers
const authController = require("./controllers/authController");

// Login API
app.post("/login", authController.login);

// Signup API
app.post("/signup", authController.signup);

// Logout API
app.post("/logout", authController.logout);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
