const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteProductVariant } = require("../../services/productVariants");

exports.deleteProductVariant = asyncWrapper(async (req, res) => {
  await deleteProductVariant(req.params?.id);
  return sendSuccess(res, 200, "Product variant deleted");
});
