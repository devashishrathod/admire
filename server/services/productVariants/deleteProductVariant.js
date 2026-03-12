const ProductVariant = require("../../models/ProductVariant");
const { throwError, validateObjectId } = require("../../utils");

exports.deleteProductVariant = async (id) => {
  validateObjectId(id, "ProductVariant Id");
  const variant = await ProductVariant.findById(id);
  if (!variant || variant.isDeleted) throwError(404, "Product variant not found");

  variant.isDeleted = true;
  variant.isActive = false;
  variant.updatedAt = new Date();
  await variant.save();
  return;
};
