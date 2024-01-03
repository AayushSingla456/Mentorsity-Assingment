// models/userModel.js
const users = {};

module.exports = {
  getUser: (username) => users[username],
  addUser: (username, password) => {
    users[username] = { username, password };
  },
};
