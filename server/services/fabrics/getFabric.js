const Fabric = require("../../models/Fabric");

exports.getFabric = async (id) => {
  return await Fabric.findOne({ _id: id, isDeleted: false });
};
