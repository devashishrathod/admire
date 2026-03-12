const FAQ = require("../../models/FAQ");
const { throwError, validateObjectId } = require("../../utils");

exports.updateFAQ = async (id, payload) => {
  validateObjectId(id, "FAQ Id");
  const faq = await FAQ.findById(id);
  if (!faq || faq.isDeleted) throwError(404, "FAQ not found");

  let { question, answer, isActive } = payload;

  if (typeof question !== "undefined") {
    question = question?.toLowerCase()?.trim();
    const existing = await FAQ.findOne({
      _id: { $ne: id },
      question,
      isDeleted: false,
    });
    if (existing) throwError(409, "FAQ already exists with this question");
    faq.question = question;
  }

  if (typeof answer !== "undefined") faq.answer = answer?.trim();
  if (typeof isActive !== "undefined") faq.isActive = isActive;

  faq.updatedAt = new Date();
  await faq.save();
  return faq;
};
