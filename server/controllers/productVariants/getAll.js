const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { getAllProductVariants } = require("../../services/productVariants");
const { validateGetAllProductVariantsQuery } = require("../../validator/productVariants");

exports.getAll = asyncWrapper(async (req, res) => {
  const { error, value } = validateGetAllProductVariantsQuery(req.query);
  if (error) throwError(422, cleanJoiError(error));
  const result = await getAllProductVariants(value);
  return sendSuccess(res, 200, "Product variants fetched", result);
});
