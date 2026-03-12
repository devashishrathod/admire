const FabricType = require("../../models/FabricType");

exports.getFabricType = async (id) => {
  return await FabricType.findOne({ _id: id, isDeleted: false });
};
