const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { addFabricBanners } = require("../../services/fabrics");

exports.addBanner = asyncWrapper(async (req, res) => {
  const banners = req.files?.banners;
  if (!banners) throwError(422, "Banner file is required");
  const result = await addFabricBanners(req.params?.id, banners);
  return sendSuccess(res, 200, "Banner added", result);
});
