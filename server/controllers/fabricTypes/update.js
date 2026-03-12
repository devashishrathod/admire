const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { updateFabricType } = require("../../services/fabricTypes");
const { validateUpdateFabricType } = require("../../validator/fabricTypes");

exports.update = asyncWrapper(async (req, res) => {
  const { error, value } = validateUpdateFabricType(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const result = await updateFabricType(req.params?.id, value);
  return sendSuccess(res, 200, "Fabric type updated", result);
});
