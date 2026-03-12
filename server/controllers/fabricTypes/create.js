const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { createFabricType } = require("../../services/fabricTypes");
const { validateCreateFabricType } = require("../../validator/fabricTypes");

exports.create = asyncWrapper(async (req, res) => {
  const { error, value } = validateCreateFabricType(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const result = await createFabricType(value);
  return sendSuccess(res, 201, "Fabric type created", result);
});
