const ProductVariant = require("../../models/ProductVariant");
const Product = require("../../models/Product");
const Fabric = require("../../models/Fabric");
const Color = require("../../models/Color");
const { throwError, validateObjectId } = require("../../utils");

exports.updateProductVariant = async (id, payload) => {
  validateObjectId(id, "ProductVariant Id");
  const variant = await ProductVariant.findById(id);
  if (!variant || variant.isDeleted) throwError(404, "Product variant not found");

  let {
    productId,
    fabricId,
    colorId,
    name,
    description,
    SKU,
    price,
    stockQuantity,
    isActive,
  } = payload;

  if (typeof productId !== "undefined") {
    validateObjectId(productId, "Product Id");
    const product = await Product.findOne({ _id: productId, isDeleted: false });
    if (!product) throwError(404, "Product not found");
    variant.productId = productId;
  }

  if (typeof fabricId !== "undefined") {
    if (fabricId) {
      validateObjectId(fabricId, "Fabric Id");
      const fabric = await Fabric.findOne({ _id: fabricId, isDeleted: false });
      if (!fabric) throwError(404, "Fabric not found");
      variant.fabricId = fabricId;
    } else {
      variant.fabricId = undefined;
    }
  }

  if (typeof colorId !== "undefined") {
    validateObjectId(colorId, "Color Id");
    const color = await Color.findOne({ _id: colorId, isDeleted: false });
    if (!color) throwError(404, "Color not found");
    variant.colorId = colorId;
  }

  if (typeof name !== "undefined") variant.name = name?.toLowerCase()?.trim();
  if (typeof description !== "undefined") {
    variant.description = description?.toLowerCase()?.trim();
  }
  if (typeof SKU !== "undefined") variant.SKU = SKU?.toUpperCase()?.trim();
  if (typeof price !== "undefined") variant.price = price;
  if (typeof stockQuantity !== "undefined") variant.stockQuantity = stockQuantity;
  if (typeof isActive !== "undefined") variant.isActive = isActive;

  variant.updatedAt = new Date();
  try {
    await variant.save();
  } catch (err) {
    if (err?.code === 11000) {
      throwError(409, "Variant already exists with same product, fabric and color");
    }
    throw err;
  }

  return variant;
};
