const express = require("express");
const {
  loginUser,
} = require("../controllers/userController");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/mongodb/user-controller");
const { errorHandler } = require("../helpers/errorHandler");

const router = express.Router();

// Route to get all users
router.get("/", errorHandler(handleGetAllUsers));

// Route for updating and deleting the user
router
  .route("/:id")
  .get(errorHandler(handleGetUserById))
  .patch(errorHandler(handleUpdateUserById))
  .delete(errorHandler(handleDeleteUserById));

router.post("/create-user", errorHandler(handleCreateNewUser));

// Route to get logged in user
router.post("/login", loginUser);

module.exports = router;
