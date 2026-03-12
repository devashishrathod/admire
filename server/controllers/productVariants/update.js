const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { updateProductVariant } = require("../../services/productVariants");
const { validateUpdateProductVariant } = require("../../validator/productVariants");

exports.update = asyncWrapper(async (req, res) => {
  const { error, value } = validateUpdateProductVariant(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const result = await updateProductVariant(req.params?.id, value);
  return sendSuccess(res, 200, "Product variant updated", result);
});
