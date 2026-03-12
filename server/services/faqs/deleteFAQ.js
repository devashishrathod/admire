const FAQ = require("../../models/FAQ");
const { throwError, validateObjectId } = require("../../utils");

exports.deleteFAQ = async (id) => {
  validateObjectId(id, "FAQ Id");
  const faq = await FAQ.findById(id);
  if (!faq || faq.isDeleted) throwError(404, "FAQ not found");

  faq.isDeleted = true;
  faq.isActive = false;
  faq.updatedAt = new Date();
  await faq.save();
  return;
};
