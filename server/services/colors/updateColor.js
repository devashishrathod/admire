const Color = require("../../models/Color");
const { throwError, validateObjectId } = require("../../utils");
const { uploadImage, deleteImage } = require("../uploads");
const { createBannersFromFiles } = require("../banners");

exports.updateColor = async (id, payload, image, bannersFiles) => {
  validateObjectId(id, "Color Id");
  const color = await Color.findById(id);
  if (!color || color.isDeleted) throwError(404, "Color not found");

  let { name, hexCode, description, isActive } = payload;

  if (typeof name !== "undefined") {
    name = name?.toLowerCase()?.trim();
    const existing = await Color.findOne({
      _id: { $ne: id },
      name,
      isDeleted: false,
    });
    if (existing) throwError(409, "Color already exists with this name");
    color.name = name;
  }

  if (typeof hexCode !== "undefined") color.hexCode = hexCode;
  if (typeof description !== "undefined") {
    color.description = description?.toLowerCase()?.trim();
  }

  if (typeof isActive !== "undefined") color.isActive = isActive;

  if (bannersFiles) {
    const bannerIds = await createBannersFromFiles(bannersFiles, {
      linkedType: "color",
      linkedId: id,
    });
    color.banners = bannerIds;
  }

  if (image) {
    await deleteImage(color?.image);
    color.image = await uploadImage(image.tempFilePath);
  }

  color.updatedAt = new Date();
  await color.save();
  return color;
};
