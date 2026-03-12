const FabricType = require("../../models/FabricType");
const { throwError, validateObjectId } = require("../../utils");

exports.deleteFabricType = async (id) => {
  validateObjectId(id, "FabricType Id");
  const fabricType = await FabricType.findById(id);
  if (!fabricType || fabricType.isDeleted) throwError(404, "Fabric type not found");

  fabricType.isDeleted = true;
  fabricType.isActive = false;
  fabricType.updatedAt = new Date();
  await fabricType.save();
  return;
};
