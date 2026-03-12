const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { createFAQ } = require("../../services/faqs");
const { validateCreateFAQ } = require("../../validator/faqs");

exports.create = asyncWrapper(async (req, res) => {
  const { error, value } = validateCreateFAQ(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const result = await createFAQ(value);
  return sendSuccess(res, 201, "FAQ created", result);
});
