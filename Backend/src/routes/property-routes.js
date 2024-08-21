const express = require("express");
const router = express.Router();
const { errorHandler } = require("../helpers/errorHandler");
const {
  getAllPropertiesForPurchase,
  getPropertyForPurchaseById,
  createNewSale,
  getAllRentalProperties,
  getRentalPropertyById,
} = require("../controllers/mongodb/property-controller");

router.get("/buy", errorHandler(getAllPropertiesForPurchase));
router.get("/buy/:id", errorHandler(getPropertyForPurchaseById));
router.post("/sell", errorHandler(createNewSale));
router.get("/rent", errorHandler(getAllRentalProperties));
router.get("/rent/:id", errorHandler(getRentalPropertyById));

module.exports = router;
