const express = require("express");
const {
  handleGetAllAdmins,
  handleGetAdminById,
  handleUpdateAdminById,
  handleDeleteAdminById,
  handleCreateNewAdmin,
} = require("../controllers/mongodb/user-controller");
const { errorHandler } = require("../helpers/errorHandler");

const router = express.Router();

// Route to get all users
router.get("/", errorHandler(handleGetAllAdmins));

// Route for updating and deleting the user
router
  .route("/:id")
  .get(errorHandler(handleGetAdminById))
  .patch(errorHandler(handleUpdateAdminById))
  .delete(errorHandler(handleDeleteAdminById));

router.post("/create-admin", errorHandler(handleCreateNewAdmin));

module.exports = router;
    