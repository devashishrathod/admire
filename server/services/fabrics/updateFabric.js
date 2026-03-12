const Fabric = require("../../models/Fabric");
const FabricType = require("../../models/FabricType");
const { throwError, validateObjectId } = require("../../utils");
const { uploadImage, deleteImage } = require("../uploads");
const { createBannersFromFiles } = require("../banners");

exports.updateFabric = async (id, payload, image, bannersFiles) => {
  validateObjectId(id, "Fabric Id");
  const fabric = await Fabric.findById(id);
  if (!fabric || fabric.isDeleted) throwError(404, "Fabric not found");

  let { typeId, name, code, description, isActive } = payload;

  if (typeof typeId !== "undefined") {
    validateObjectId(typeId, "FabricType Id");
    const ft = await FabricType.findOne({ _id: typeId, isDeleted: false });
    if (!ft) throwError(404, "Fabric type not found");
    fabric.typeId = typeId;
  }

  if (typeof name !== "undefined") {
    name = name?.toLowerCase()?.trim();
    const existing = await Fabric.findOne({
      _id: { $ne: id },
      name,
      isDeleted: false,
    });
    if (existing) throwError(409, "Fabric already exists with this name");
    fabric.name = name;
  }

  if (typeof code !== "undefined") fabric.code = code?.toUpperCase()?.trim();
  if (typeof description !== "undefined") {
    fabric.description = description?.toLowerCase()?.trim();
  }
  if (typeof isActive !== "undefined") fabric.isActive = isActive;

  if (bannersFiles) {
    const bannerIds = await createBannersFromFiles(bannersFiles, {
      linkedType: "fabric",
      linkedId: id,
    });
    fabric.banners = bannerIds;
  }

  if (image) {
    await deleteImage(fabric?.image);
    fabric.image = await uploadImage(image.tempFilePath);
  }

  fabric.updatedAt = new Date();
  await fabric.save();
  return fabric;
};
