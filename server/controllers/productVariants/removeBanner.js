const { asyncWrapper, sendSuccess } = require("../../utils");
const { removeProductVariantBanner } = require("../../services/productVariants");

exports.removeBanner = asyncWrapper(async (req, res) => {
  const result = await removeProductVariantBanner(
    req.params?.id,
    req.params?.bannerId,
  );
  return sendSuccess(res, 200, "Banner removed", result);
});
