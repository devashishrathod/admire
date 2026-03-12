const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { updateFAQ } = require("../../services/faqs");
const { validateUpdateFAQ } = require("../../validator/faqs");

exports.update = asyncWrapper(async (req, res) => {
  const { error, value } = validateUpdateFAQ(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const result = await updateFAQ(req.params?.id, value);
  return sendSuccess(res, 200, "FAQ updated", result);
});
