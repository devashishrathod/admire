const FAQ = require("../../models/FAQ");
const { throwError } = require("../../utils");

exports.createFAQ = async (payload) => {
  let { question, answer, isActive } = payload;
  question = question?.toLowerCase()?.trim();
  answer = answer?.trim();

  const existing = await FAQ.findOne({ question, isDeleted: false });
  if (existing) throwError(409, "FAQ already exists with this question");

  return await FAQ.create({ question, answer, isActive });
};
