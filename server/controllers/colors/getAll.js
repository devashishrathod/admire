const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { getAllColors } = require("../../services/colors");
const { validateGetAllColorsQuery } = require("../../validator/colors");

exports.getAll = asyncWrapper(async (req, res) => {
  const { error, value } = validateGetAllColorsQuery(req.query);
  if (error) throwError(422, cleanJoiError(error));
  const result = await getAllColors(value);
  return sendSuccess(res, 200, "Colors fetched", result);
});
