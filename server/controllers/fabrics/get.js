const {
  asyncWrapper,
  sendSuccess,
  throwError,
  validateObjectId,
} = require("../../utils");
const { getFabric } = require("../../services/fabrics");

exports.get = asyncWrapper(async (req, res) => {
  validateObjectId(req.params?.id, "Fabric Id");
  const result = await getFabric(req.params?.id);
  if (!result) throwError(404, "Fabric not found");
  return sendSuccess(res, 200, "Fabric fetched", result);
});
