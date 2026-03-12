const { asyncWrapper, sendSuccess } = require("../../utils");
const { removeColorBanner } = require("../../services/colors");

exports.removeBanner = asyncWrapper(async (req, res) => {
  const result = await removeColorBanner(req.params?.id, req.params?.bannerId);
  return sendSuccess(res, 200, "Banner removed", result);
});
