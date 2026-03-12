const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { updateColor } = require("../../services/colors");
const { validateUpdateColor } = require("../../validator/colors");

exports.update = asyncWrapper(async (req, res) => {
  const { error, value } = validateUpdateColor(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const image = req.files?.image;
  const banners = req.files?.banners;
  const result = await updateColor(req.params?.id, value, image, banners);
  return sendSuccess(res, 200, "Color updated", result);
});
