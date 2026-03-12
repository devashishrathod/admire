const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { addColorBanners } = require("../../services/colors");

exports.addBanner = asyncWrapper(async (req, res) => {
  const banners = req.files?.banners;
  if (!banners) throwError(422, "Banner file is required");
  const result = await addColorBanners(req.params?.id, banners);
  return sendSuccess(res, 200, "Banner added", result);
});
