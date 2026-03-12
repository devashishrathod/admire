const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { getAllFabrics } = require("../../services/fabrics");
const { validateGetAllFabricsQuery } = require("../../validator/fabrics");

exports.getAll = asyncWrapper(async (req, res) => {
  const { error, value } = validateGetAllFabricsQuery(req.query);
  if (error) throwError(422, cleanJoiError(error));
  const result = await getAllFabrics(value);
  return sendSuccess(res, 200, "Fabrics fetched", result);
});
