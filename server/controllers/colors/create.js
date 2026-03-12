const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { createColor } = require("../../services/colors");
const { validateCreateColor } = require("../../validator/colors");

exports.create = asyncWrapper(async (req, res) => {
  const { error, value } = validateCreateColor(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const image = req.files?.image;
  const banners = req.files?.banners;
  const result = await createColor(value, image, banners);
  return sendSuccess(res, 201, "Color created", result);
});
