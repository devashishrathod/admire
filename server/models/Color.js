const mongoose = require("mongoose");
const { bannersField } = require("./validObjectId");

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    hexCode: { type: String },
    description: { type: String },
    image: { type: String },
    banners: { ...bannersField },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Color", colorSchema);
