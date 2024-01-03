// controllers/authController.js
const userModel = require('../models/userModel');

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;
    const user = userModel.getUser(username);

    if (user && user.password === password) {
      const sessionId = Math.random().toString(36).substring(7);
      res.cookie('sessionId', sessionId, { httpOnly: true });
      user.sessionId = sessionId;
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  },

  signup: (req, res) => {
    const { username, password } = req.body;

    if (userModel.getUser(username)) {
      res.status(400).json({ success: false, message: 'Username already exists' });
    } else {
      userModel.addUser(username, password);
      res.json({ success: true, message: 'Signup successful. Please login.' });
    }
  },

  logout: (req, res) => {
    const { username } = req.body;
    const user = userModel.getUser(username);

    if (user) {
      // Clear the session ID and remove the cookie
      user.sessionId = null;
      res.clearCookie('sessionId');
      res.json({ success: true, message: 'Logout successful' });
    } else {
      res.status(401).json({ success: false, message: 'User not found' });
    }
  },
};
