const ProductType = require("../../models/ProductType");
const { throwError, validateObjectId } = require("../../utils");

exports.updateProductType = async (id, payload) => {
  validateObjectId(id, "ProductType Id");
  const productType = await ProductType.findById(id);
  if (!productType || productType.isDeleted) throwError(404, "Product type not found");

  let { name, code, description, isActive } = payload;

  if (typeof name !== "undefined") {
    name = name?.toLowerCase()?.trim();
    const existing = await ProductType.findOne({
      _id: { $ne: id },
      name,
      isDeleted: false,
    });
    if (existing) throwError(409, "Product type already exists with this name");
    productType.name = name;
  }

  if (typeof code !== "undefined") productType.code = code?.toUpperCase()?.trim();
  if (typeof description !== "undefined") {
    productType.description = description?.toLowerCase()?.trim();
  }
  if (typeof isActive !== "undefined") productType.isActive = isActive;

  productType.updatedAt = new Date();
  await productType.save();
  return productType;
};
