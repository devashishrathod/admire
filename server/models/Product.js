const mongoose = require("mongoose");
const { DEFAULT_IMAGES, DIMENSION_UNITS } = require("../constants");
const {
  categoryField,
  subCategoryField,
  productTypeField,
  bannersField,
} = require("./validObjectId");

const productSchema = new mongoose.Schema(
  {
    categoryId: { ...categoryField, required: true },
    subCategoryId: { ...subCategoryField, required: true },
    typeId: { ...productTypeField, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    brand: { type: String, trim: true },
    generalPrice: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    SKU: { type: String, required: true, trim: true },
    weightInKg: { type: Number, required: true },
    dimensions: {
      unit: {
        type: String,
        enum: Object.values(DIMENSION_UNITS),
        default: DIMENSION_UNITS.MM,
      },
      length: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
      volume: { type: Number, default: 0 },
    },
    materials: [{ type: String, trim: true }],
    origin: { type: String, trim: true },
    designer: { type: String, trim: true },
    image: { type: String, default: DEFAULT_IMAGES.PRODUCT },
    banners: { ...bannersField },
    isOutOfStock: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

productSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } },
);

productSchema.methods.calculateVolume = function () {
  const { length, width, height } = this.dimensions || {};
  const dims = [length, width, height]
    .map((v) => (typeof v === "number" ? v : Number(v)))
    .filter((v) => Number.isFinite(v) && v > 0);
  if (dims.length === 0) return 0;
  return dims.reduce((acc, v) => acc * v, 1);
};

productSchema.methods.normalizeMaterials = function () {
  if (!Array.isArray(this.materials)) return;
  const normalized = this.materials
    .filter((m) => typeof m === "string")
    .map((m) => m.trim().toLowerCase())
    .filter((m) => m.length > 0);
  this.materials = Array.from(new Set(normalized));
};

productSchema.pre("save", function () {
  if (this.isModified("materials")) {
    this.normalizeMaterials();
  }
  if (
    this.isModified("dimensions.length") ||
    this.isModified("dimensions.width") ||
    this.isModified("dimensions.height")
  ) {
    this.dimensions.volume = this.calculateVolume();
  }
});

module.exports = mongoose.model("Product", productSchema);
