const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { getAllFabricTypes } = require("../../services/fabricTypes");
const { validateGetAllFabricTypesQuery } = require("../../validator/fabricTypes");

exports.getAll = asyncWrapper(async (req, res) => {
  const { error, value } = validateGetAllFabricTypesQuery(req.query);
  if (error) throwError(422, cleanJoiError(error));
  const result = await getAllFabricTypes(value);
  return sendSuccess(res, 200, "Fabric types fetched", result);
});
