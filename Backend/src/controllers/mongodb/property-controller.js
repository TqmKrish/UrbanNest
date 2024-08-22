const Property = require("../../models/mongo/properties/property-model");

const getAllPropertiesForPurchase = async (req, res) => {
  let properties = await Property.find(
    {},
    {
      title: 1,
      location: 1,
      createdAt: 1,
      bathrooms: 1,
      bedrooms: 1,
      superBuiltUpArea: 1,
      price: 1,
      images: 1,
    }
  )
    .lean()
    .exec();

  properties = properties.map((property) => {
    const { _id, ...rest } = property; // Destructure `_id` and collect the rest
    return {
      id: _id.toString(), // Convert `_id` to string and rename to `id`
      ...rest, // Include other fields
    };
  });

  res.status(200).json({ properties: properties, isActionSuccessful: true });
};

const getPropertyForPurchaseById = async (req, res) => {
  const property = await Property.findById(req.params.id)
    .populate("sellerId")
    .exec();
  if (!property) return res.status(404).send("Property not found");

  // Assign all seller details to `sellerDetails`
  const propertyData = property.toObject();
  propertyData.sellerDetails = propertyData.sellerId;
  delete propertyData.sellerId;
  res.status(200).json({ property: propertyData, isActionSuccessful: true });
};

// const filterPropertiesForPurchase = async (req, res) => {
//   const searchTerm = req.query.searchTerm || "";

//   if (!searchTerm) {
//     return getAllPropertiesForPurchase(req, res);
//   }

//   const sanitizedSearchTerm = searchTerm
//     .trim()
//     .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//   const searchQuery = {
//     $or: [
//       { title: { $regex: sanitizedSearchTerm, $options: "i" } },
//       { description: { $regex: sanitizedSearchTerm, $options: "i" } },
//       { location: { $regex: sanitizedSearchTerm, $options: "i" } },
//       { projectName: { $regex: sanitizedSearchTerm, $options: "i" } },
//       { type: { $regex: sanitizedSearchTerm, $options: "i" } },
//       { furnishing: { $regex: sanitizedSearchTerm, $options: "i" } },
//       { constructionStatus: { $regex: sanitizedSearchTerm, $options: "i" } },
//       { facing: { $regex: sanitizedSearchTerm, $options: "i" } },
//       // Numeric fields excluded from regex
//     ],
//   };

//   const properties = await Property.find(searchQuery).lean().exec();
//   const results = properties.map((property) => {
//     const { _id, ...rest } = property.toObject();
//     return {
//       id: _id.toString(),
//       ...rest,
//     };
//   });

//   res.status(200).json({ properties: results, isActionSuccessful: true });
// };

const createNewSale = async (req, res) => {
  const files = req.files.reduce((acc, file) => {
    // Extract the index from the fieldname
    const match = file.fieldname.match(/images\[(\d+)\]/);
    if (match) {
      const index = parseInt(match[1], 10);
      acc[index] = `${file.filename}`;
    }
    return acc;
  }, []);

  console.log("Files:", files); // files will be an array of file objects
  // Extract form fields from req.body
  const {
    title,
    description,
    type,
    bedrooms,
    bathrooms,
    furnishing,
    constructionStatus,
    sellerId,
    superBuiltUpArea,
    carpetArea,
    totalFloors,
    floorNo,
    carParking,
    facing,
    projectName,
    price,
    location,
  } = req.body;

  // Create a new PropertySale document
  const newSale = new Property({
    title,
    description,
    type,
    bedrooms,
    bathrooms,
    furnishing,
    constructionStatus,
    sellerId,
    superBuiltUpArea,
    carpetArea,
    totalFloors,
    floorNo,
    carParking,
    facing,
    projectName,
    price,
    location,
    images: files,
  });

  // Save the document to the database
  await newSale.save();

  res.status(201).json({ message: "Sale created successfully", data: newSale });
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
  // filterPropertiesForPurchase,
  createNewSale,
  getAllRentalProperties,
  getRentalPropertyById,
};
