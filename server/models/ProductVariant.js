const mongoose = require("mongoose");
const {
  productField,
  fabricField,
  colorField,
  bannersField,
} = require("./validObjectId");

const productVariantSchema = new mongoose.Schema(
  {
    productId: { ...productField, required: true },
    fabricId: { ...fabricField },
    colorId: { ...colorField, required: true },
    name: { type: String, required: true },
    description: { type: String },
    SKU: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    banners: { ...bannersField },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

productVariantSchema.index(
  { productId: 1, fabricId: 1, colorId: 1 },
  { unique: true },
);

module.exports = mongoose.model("ProductVariant", productVariantSchema);
