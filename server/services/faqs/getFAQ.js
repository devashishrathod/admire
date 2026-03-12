const FAQ = require("../../models/FAQ");

exports.getFAQ = async (id) => {
  return await FAQ.findOne({ _id: id, isDeleted: false });
};
