const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { addProductBanners } = require("../../services/products");

exports.addBanner = asyncWrapper(async (req, res) => {
  const banners = req.files?.banners;
  if (!banners) throwError(422, "Banner file is required");
  const result = await addProductBanners(req.params?.id, banners);
  return sendSuccess(res, 200, "Banner added", result);
});
