const Color = require("../../models/Color");
const { throwError } = require("../../utils");
const { uploadImage } = require("../uploads");
const { createBannersFromFiles } = require("../banners");

exports.createColor = async (payload, image, bannersFiles) => {
  let { name, hexCode, description, isActive } = payload;
  name = name?.toLowerCase()?.trim();
  description = description?.toLowerCase()?.trim();

  const existing = await Color.findOne({ name, isDeleted: false });
  if (existing) throwError(409, "Color already exists with this name");

  let imageUrl;
  if (image) imageUrl = await uploadImage(image.tempFilePath);

  const banners = await createBannersFromFiles(bannersFiles, {
    linkedType: "color",
  });

  return await Color.create({
    name,
    hexCode,
    description,
    image: imageUrl,
    banners,
    isActive,
  });
};
