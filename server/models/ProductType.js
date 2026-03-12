const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("ProductType", productTypeSchema);
