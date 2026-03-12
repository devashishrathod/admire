const Color = require("../../models/Color");

exports.getColor = async (id) => {
  return await Color.findOne({ _id: id, isDeleted: false });
};
