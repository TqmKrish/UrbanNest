const express = require("express");
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

module.exports = router;
