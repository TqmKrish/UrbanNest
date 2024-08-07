const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    name: String,
    title: String,
    description: String,
    type: String,
    bedrooms: Number,
    bathrooms: Number,
    furnishing: String,
    constructionStatus: String,
    listedBy: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the user
    superBuiltUpArea: Number,
    carpetArea: Number,
    totalFloors: Number,
    floorNo: Number,
    carParking: Number,
    facing: String,
    projectName: String,
    price: Number,
    postedDate: Date,
    images: [String], // Array of image URLs
    location: String,
    isFavorite: Boolean,
    locationCoordinates: {
      latitude: Number,
      longitude: Number,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], // Reference to reviews
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
