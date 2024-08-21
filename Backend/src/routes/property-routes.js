const express = require("express");
const router = express.Router();
const multer = require("multer");
const { errorHandler } = require("../helpers/errorHandler");
const {
  getAllPropertiesForPurchase,
  getPropertyForPurchaseById,
  createNewSale,
  getAllRentalProperties,
  getRentalPropertyById,
} = require("../controllers/mongodb/property-controller");
const upload = require("../config/multerConfig");

// const upload = multer({ dest: "public" });

router.get("/buy", errorHandler(getAllPropertiesForPurchase));
router.get("/buy/:id", errorHandler(getPropertyForPurchaseById));
router.post("/sell", upload.any(), errorHandler(createNewSale));
router.get("/rent", errorHandler(getAllRentalProperties));
router.get("/rent/:id", errorHandler(getRentalPropertyById));

module.exports = router;
