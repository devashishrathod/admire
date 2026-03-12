const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { getAllProductTypes } = require("../../services/productTypes");
const { validateGetAllProductTypesQuery } = require("../../validator/productTypes");

exports.getAll = asyncWrapper(async (req, res) => {
  const { error, value } = validateGetAllProductTypesQuery(req.query);
  if (error) throwError(422, cleanJoiError(error));
  const result = await getAllProductTypes(value);
  return sendSuccess(res, 200, "Product types fetched", result);
});
