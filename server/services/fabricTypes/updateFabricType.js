const FabricType = require("../../models/FabricType");
const { throwError, validateObjectId } = require("../../utils");

exports.updateFabricType = async (id, payload) => {
  validateObjectId(id, "FabricType Id");
  const fabricType = await FabricType.findById(id);
  if (!fabricType || fabricType.isDeleted) throwError(404, "Fabric type not found");

  let { name, code, description, isActive } = payload;

  if (typeof name !== "undefined") {
    name = name?.toLowerCase()?.trim();
    const existing = await FabricType.findOne({
      _id: { $ne: id },
      name,
      isDeleted: false,
    });
    if (existing) throwError(409, "Fabric type already exists with this name");
    fabricType.name = name;
  }

  if (typeof code !== "undefined") fabricType.code = code?.toUpperCase()?.trim();
  if (typeof description !== "undefined") {
    fabricType.description = description?.toLowerCase()?.trim();
  }
  if (typeof isActive !== "undefined") fabricType.isActive = isActive;

  fabricType.updatedAt = new Date();
  await fabricType.save();
  return fabricType;
};
