const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { replaceProductBanner } = require("../../services/products");

exports.replaceBanner = asyncWrapper(async (req, res) => {
  const file = req.files?.banners;
  if (!file) throwError(422, "Banner file is required");
  const result = await replaceProductBanner(
    req.params?.id,
    req.params?.bannerId,
    file,
  );
  return sendSuccess(res, 200, "Banner replaced", result);
});
