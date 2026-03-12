const mongoose = require("mongoose");
const { bannersField, fabricTypeField } = require("./validObjectId");

const fabricSchema = new mongoose.Schema(
  {
    typeId: { ...fabricTypeField, required: true },
    name: { type: String, required: true, unique: true },
    code: { type: String },
    description: { type: String },
    image: { type: String },
    banners: { ...bannersField },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Fabric", fabricSchema);
