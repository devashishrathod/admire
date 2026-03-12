const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { createProductVariant } = require("../../services/productVariants");
const {
  validateCreateProductVariant,
} = require("../../validator/productVariants");

exports.create = asyncWrapper(async (req, res) => {
  const { error, value } = validateCreateProductVariant(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const banners = req.files?.banners;
  const result = await createProductVariant(value, banners);
  return sendSuccess(res, 201, "Product variant created", result);
});
