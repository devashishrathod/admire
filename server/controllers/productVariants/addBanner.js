const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { addProductVariantBanners } = require("../../services/productVariants");

exports.addBanner = asyncWrapper(async (req, res) => {
  const banners = req.files?.banners;
  if (!banners) throwError(422, "Banner file is required");
  const result = await addProductVariantBanners(req.params?.id, banners);
  return sendSuccess(res, 200, "Banner added", result);
});
