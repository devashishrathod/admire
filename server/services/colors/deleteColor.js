const Color = require("../../models/Color");
const { throwError, validateObjectId } = require("../../utils");
const { deleteImage } = require("../uploads");

exports.deleteColor = async (id) => {
  validateObjectId(id, "Color Id");
  const color = await Color.findById(id);
  if (!color || color.isDeleted) throwError(404, "Color not found");

  await deleteImage(color?.image);
  color.image = null;
  color.isDeleted = true;
  color.isActive = false;
  color.updatedAt = new Date();
  await color.save();
  return;
};
