const FabricType = require("../../models/FabricType");
const { throwError } = require("../../utils");

exports.createFabricType = async (payload) => {
  let { name, code, description, isActive } = payload;
  name = name?.toLowerCase()?.trim();
  description = description?.toLowerCase()?.trim();
  code = code?.toUpperCase()?.trim();

  const existing = await FabricType.findOne({ name, isDeleted: false });
  if (existing) throwError(409, "Fabric type already exists with this name");

  return await FabricType.create({ name, code, description, isActive });
};
