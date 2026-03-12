const ProductVariant = require("../../models/ProductVariant");
const Product = require("../../models/Product");
const Fabric = require("../../models/Fabric");
const Color = require("../../models/Color");
const { throwError, validateObjectId } = require("../../utils");
const { createBannersFromFiles } = require("../banners");

exports.createProductVariant = async (payload, bannersFiles) => {
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

  validateObjectId(productId, "Product Id");
  const product = await Product.findOne({ _id: productId, isDeleted: false });
  if (!product) throwError(404, "Product not found");

  if (fabricId) {
    validateObjectId(fabricId, "Fabric Id");
    const fabric = await Fabric.findOne({ _id: fabricId, isDeleted: false });
    if (!fabric) throwError(404, "Fabric not found");
  }

  validateObjectId(colorId, "Color Id");
  const color = await Color.findOne({ _id: colorId, isDeleted: false });
  if (!color) throwError(404, "Color not found");

  name = name?.toLowerCase()?.trim();
  description = description?.toLowerCase()?.trim();
  SKU = SKU?.toUpperCase()?.trim();

  try {
    const variant = await ProductVariant.create({
      productId,
      fabricId,
      colorId,
      name,
      description,
      SKU,
      price,
      stockQuantity,
      isActive,
    });

    if (bannersFiles) {
      const banners = await createBannersFromFiles(bannersFiles, {
        linkedType: "variant",
        linkedId: variant._id,
      });
      variant.banners = banners;
      variant.updatedAt = new Date();
      await variant.save();
    }

    return variant;
  } catch (err) {
    if (err?.code === 11000) {
      throwError(
        409,
        "Variant already exists with same product, fabric and color",
      );
    }
    throw err;
  }
};
