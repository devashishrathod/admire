const Fabric = require("../../models/Fabric");
const { throwError, validateObjectId } = require("../../utils");
const { deleteImage } = require("../uploads");

exports.deleteFabric = async (id) => {
  validateObjectId(id, "Fabric Id");
  const fabric = await Fabric.findById(id);
  if (!fabric || fabric.isDeleted) throwError(404, "Fabric not found");

  await deleteImage(fabric?.image);
  fabric.image = null;
  fabric.isDeleted = true;
  fabric.isActive = false;
  fabric.updatedAt = new Date();
  await fabric.save();
  return;
};
