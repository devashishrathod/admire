const Fabric = require("../../models/Fabric");
const FabricType = require("../../models/FabricType");
const { throwError, validateObjectId } = require("../../utils");
const { uploadImage } = require("../uploads");
const { createBannersFromFiles } = require("../banners");

exports.createFabric = async (payload, image, bannersFiles) => {
  let { typeId, name, code, description, isActive } = payload;
  validateObjectId(typeId, "FabricType Id");
  const ft = await FabricType.findOne({ _id: typeId, isDeleted: false });
  if (!ft) throwError(404, "Fabric type not found");

  name = name?.toLowerCase()?.trim();
  description = description?.toLowerCase()?.trim();
  code = code?.toUpperCase()?.trim();

  const existing = await Fabric.findOne({ name, isDeleted: false });
  if (existing) throwError(409, "Fabric already exists with this name");

  let imageUrl;
  if (image) imageUrl = await uploadImage(image.tempFilePath);

  const banners = await createBannersFromFiles(bannersFiles, {
    linkedType: "fabric",
  });

  return await Fabric.create({
    typeId,
    name,
    code,
    description,
    image: imageUrl,
    banners,
    isActive,
  });
};
