const { asyncWrapper, sendSuccess } = require("../../utils");
const { removeProductBanner } = require("../../services/products");

exports.removeBanner = asyncWrapper(async (req, res) => {
  const result = await removeProductBanner(req.params?.id, req.params?.bannerId);
  return sendSuccess(res, 200, "Banner removed", result);
});
