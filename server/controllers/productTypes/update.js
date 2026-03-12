const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { updateProductType } = require("../../services/productTypes");
const { validateUpdateProductType } = require("../../validator/productTypes");

exports.update = asyncWrapper(async (req, res) => {
  const { error, value } = validateUpdateProductType(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const result = await updateProductType(req.params?.id, value);
  return sendSuccess(res, 200, "Product type updated", result);
});
