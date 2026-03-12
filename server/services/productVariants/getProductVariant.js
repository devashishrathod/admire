const ProductVariant = require("../../models/ProductVariant");

exports.getProductVariant = async (id) => {
  return await ProductVariant.findOne({ _id: id, isDeleted: false });
};
