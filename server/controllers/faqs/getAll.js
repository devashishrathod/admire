const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { getAllFAQs } = require("../../services/faqs");
const { validateGetAllFAQsQuery } = require("../../validator/faqs");

exports.getAll = asyncWrapper(async (req, res) => {
  const { error, value } = validateGetAllFAQsQuery(req.query);
  if (error) throwError(422, cleanJoiError(error));
  const result = await getAllFAQs(value);
  return sendSuccess(res, 200, "FAQs fetched", result);
});
