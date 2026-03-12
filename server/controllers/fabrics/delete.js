const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteFabric } = require("../../services/fabrics");

exports.deleteFabric = asyncWrapper(async (req, res) => {
  await deleteFabric(req.params?.id);
  return sendSuccess(res, 200, "Fabric deleted");
});
