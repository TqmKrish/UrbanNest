const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    furnishing: {
      type: String,
      required: true,
    },
    constructionStatus: {
      type: String,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    superBuiltUpArea: {
      type: Number,
      required: true,
    },
    carpetArea: {
      type: Number,
      required: true,
    },
    totalFloors: {
      type: Number,
      required: true,
    },
    floorNo: {
      type: Number,
      required: true,
    },
    carParking: {
      type: Number,
      required: true,
    },
    facing: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    reviews: [
      {
        id: {
          type: String, // Unique review ID
        },
        reviewerName: {
          type: String, // Name of the reviewer
        },
        dateTime: {
          type: Date, // Review date and time
        },
        rating: {
          type: Number, // Rating given by the reviewer
        },
        description: {
          type: String, // Review description
        },
        profilePicture: {
          type: String, // URL to reviewer's profile picture
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
