const { validateUserCredentials } = require("../services/userService");
const { db } = require("../config/dbConfig");

// Fetch all users from the database
const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM Users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  validateUserCredentials(username, password, (err, user) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Server error");
      return;
    }
    if (!user) {
      // res.status(401).send("Invalid email or password");
      res.json({
        message: "Invalid Credentials",
        user: {},
        isLoginSuccessful: false,
      });
      return;
    }
    res.json({ message: "Login successful", user, isLoginSuccessful: true });
  });
};

module.exports = { getAllUsers, loginUser };
