const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteColor } = require("../../services/colors");

exports.deleteColor = asyncWrapper(async (req, res) => {
  await deleteColor(req.params?.id);
  return sendSuccess(res, 200, "Color deleted");
});
