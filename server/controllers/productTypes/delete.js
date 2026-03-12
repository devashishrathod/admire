const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteProductType } = require("../../services/productTypes");

exports.deleteProductType = asyncWrapper(async (req, res) => {
  await deleteProductType(req.params?.id);
  return sendSuccess(res, 200, "Product type deleted");
});
