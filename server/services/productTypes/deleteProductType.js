const ProductType = require("../../models/ProductType");
const { throwError, validateObjectId } = require("../../utils");

exports.deleteProductType = async (id) => {
  validateObjectId(id, "ProductType Id");
  const productType = await ProductType.findById(id);
  if (!productType || productType.isDeleted) throwError(404, "Product type not found");

  productType.isDeleted = true;
  productType.isActive = false;
  productType.updatedAt = new Date();
  await productType.save();
  return;
};
