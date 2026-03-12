const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { createProductType } = require("../../services/productTypes");
const { validateCreateProductType } = require("../../validator/productTypes");

exports.create = asyncWrapper(async (req, res) => {
  const { error, value } = validateCreateProductType(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const result = await createProductType(value);
  return sendSuccess(res, 201, "Product type created", result);
});
