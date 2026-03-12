const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteFabricType } = require("../../services/fabricTypes");

exports.deleteFabricType = asyncWrapper(async (req, res) => {
  await deleteFabricType(req.params?.id);
  return sendSuccess(res, 200, "Fabric type deleted");
});
