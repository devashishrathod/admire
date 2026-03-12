const {
  asyncWrapper,
  sendSuccess,
  throwError,
  validateObjectId,
} = require("../../utils");
const { getFabricType } = require("../../services/fabricTypes");

exports.get = asyncWrapper(async (req, res) => {
  validateObjectId(req.params?.id, "FabricType Id");
  const result = await getFabricType(req.params?.id);
  if (!result) throwError(404, "Fabric type not found");
  return sendSuccess(res, 200, "Fabric type fetched", result);
});
