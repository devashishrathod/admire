const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { updateBanner } = require("../../services/banners");

exports.update = asyncWrapper(async (req, res) => {
  const file = req.files?.banners;
  if (!file) throwError(422, "Banner file is required");
  const result = await updateBanner(req.params?.id, file, req.body);
  return sendSuccess(res, 200, "Banner updated", result);
});
