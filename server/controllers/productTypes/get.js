const {
  asyncWrapper,
  sendSuccess,
  throwError,
  validateObjectId,
} = require("../../utils");
const { getProductType } = require("../../services/productTypes");

exports.get = asyncWrapper(async (req, res) => {
  validateObjectId(req.params?.id, "ProductType Id");
  const result = await getProductType(req.params?.id);
  if (!result) throwError(404, "Product type not found");
  return sendSuccess(res, 200, "Product type fetched", result);
});
