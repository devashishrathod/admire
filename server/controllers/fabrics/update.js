const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { updateFabric } = require("../../services/fabrics");
const { validateUpdateFabric } = require("../../validator/fabrics");

exports.update = asyncWrapper(async (req, res) => {
  const { error, value } = validateUpdateFabric(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const image = req.files?.image;
  const banners = req.files?.banners;
  const result = await updateFabric(req.params?.id, value, image, banners);
  return sendSuccess(res, 200, "Fabric updated", result);
});
