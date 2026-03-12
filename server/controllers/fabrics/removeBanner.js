const { asyncWrapper, sendSuccess } = require("../../utils");
const { removeFabricBanner } = require("../../services/fabrics");

exports.removeBanner = asyncWrapper(async (req, res) => {
  const result = await removeFabricBanner(req.params?.id, req.params?.bannerId);
  return sendSuccess(res, 200, "Banner removed", result);
});
