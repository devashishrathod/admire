const {
  asyncWrapper,
  sendSuccess,
  throwError,
  validateObjectId,
} = require("../../utils");
const { getProductVariant } = require("../../services/productVariants");

exports.get = asyncWrapper(async (req, res) => {
  validateObjectId(req.params?.id, "ProductVariant Id");
  const result = await getProductVariant(req.params?.id);
  if (!result) throwError(404, "Product variant not found");
  return sendSuccess(res, 200, "Product variant fetched", result);
});
