const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    reviewerName: String,
    dateTime: Date,
    rating: Number,
    description: String,
    image: String, // URL to the reviewer's image
    property: { type: Schema.Types.ObjectId, ref: "Property" }, // Reference to the property
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
