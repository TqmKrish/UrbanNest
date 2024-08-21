const getAllPropertiesForPurchase = async (req, res) => {
  res.status(200).json({ message: "Hi" });
};

const getPropertyForPurchaseById = async (req, res) => {
  res.status(200).json({ message: "hi, buy id" });
};

const createNewSale = async (req, res) => {
  res.status(200).json({ message: "Hi, sale" });
};

const getAllRentalProperties = async (req, res) => {
  res.status(200).json({ message: "Hi, rent" });
};

const getRentalPropertyById = async (req, res) => {
  res.status(200).json({ message: "hi, rent id" });
};
module.exports = {
  getAllPropertiesForPurchase,
  getPropertyForPurchaseById,
  createNewSale,
  getAllRentalProperties,
  getRentalPropertyById,
};
