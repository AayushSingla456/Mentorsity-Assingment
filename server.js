const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const crypto = require("crypto");
const dotenv = require("dotenv");
const authController = require("./controllers/authController");

dotenv.config();

const sessionSecretKey = crypto.randomBytes(32).toString("hex");
console.log("Secret Key:", sessionSecretKey);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //MONGODB_URI=mongodb+srv://mentorsity:mentorsity@cluster0.ymuwhog.mongodb.net/
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const app = express();

app.use(
  session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.post("/signup", authController.signup);
app.post("/login", authController.login);
app.post("/logout", authController.logout);
app.get("/dashboard", authController.dashboard);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
