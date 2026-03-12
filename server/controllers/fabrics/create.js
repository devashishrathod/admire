const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { createFabric } = require("../../services/fabrics");
const { validateCreateFabric } = require("../../validator/fabrics");

exports.create = asyncWrapper(async (req, res) => {
  const { error, value } = validateCreateFabric(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const image = req.files?.image;
  const banners = req.files?.banners;
  const result = await createFabric(value, image, banners);
  return sendSuccess(res, 201, "Fabric created", result);
});
