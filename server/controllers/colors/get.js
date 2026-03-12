const {
  asyncWrapper,
  sendSuccess,
  throwError,
  validateObjectId,
} = require("../../utils");
const { getColor } = require("../../services/colors");

exports.get = asyncWrapper(async (req, res) => {
  validateObjectId(req.params?.id, "Color Id");
  const result = await getColor(req.params?.id);
  if (!result) throwError(404, "Color not found");
  return sendSuccess(res, 200, "Color fetched", result);
});
