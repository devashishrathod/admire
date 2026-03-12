const ProductType = require("../../models/ProductType");
const { throwError } = require("../../utils");

exports.createProductType = async (payload) => {
  let { name, code, description, isActive } = payload;
  name = name?.toLowerCase()?.trim();
  description = description?.toLowerCase()?.trim();
  code = code?.toUpperCase()?.trim();

  const existing = await ProductType.findOne({ name, isDeleted: false });
  if (existing) throwError(409, "Product type already exists with this name");

  return await ProductType.create({ name, code, description, isActive });
};
