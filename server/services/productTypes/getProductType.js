const ProductType = require("../../models/ProductType");

exports.getProductType = async (id) => {
  return await ProductType.findOne({ _id: id, isDeleted: false });
};
