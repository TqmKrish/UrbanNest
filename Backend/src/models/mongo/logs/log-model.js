const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the log schema
const logSchema = new Schema(
  {
    ip: { type: String },
    method: { type: String },
    path: { type: String },
    requestBody: { type: Schema.Types.Mixed },
    responseBody: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
