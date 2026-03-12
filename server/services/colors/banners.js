const Color = require("../../models/Color");
const { throwError, validateObjectId } = require("../../utils");
const { createBannersFromFiles, deleteBanner, updateBanner } = require("../banners");

exports.addColorBanners = async (colorId, bannersFiles) => {
  validateObjectId(colorId, "Color Id");
  const color = await Color.findById(colorId);
  if (!color || color.isDeleted) throwError(404, "Color not found");

  const newIds = await createBannersFromFiles(bannersFiles, {
    linkedType: "color",
    linkedId: colorId,
  });

  const current = Array.isArray(color.banners) ? color.banners.map(String) : [];
  color.banners = Array.from(new Set([...current, ...newIds]));
  color.updatedAt = new Date();
  await color.save();
  return color;
};

exports.replaceColorBanner = async (colorId, bannerId, file) => {
  validateObjectId(colorId, "Color Id");
  validateObjectId(bannerId, "Banner Id");
  const color = await Color.findById(colorId);
  if (!color || color.isDeleted) throwError(404, "Color not found");

  const ids = Array.isArray(color.banners) ? color.banners.map(String) : [];
  if (!ids.includes(String(bannerId))) throwError(404, "Banner not linked with this color");

  await updateBanner(bannerId, file);
  return await Color.findById(colorId);
};

exports.removeColorBanner = async (colorId, bannerId) => {
  validateObjectId(colorId, "Color Id");
  validateObjectId(bannerId, "Banner Id");
  const color = await Color.findById(colorId);
  if (!color || color.isDeleted) throwError(404, "Color not found");

  const ids = Array.isArray(color.banners) ? color.banners.map(String) : [];
  if (!ids.includes(String(bannerId))) throwError(404, "Banner not linked with this color");

  color.banners = ids.filter((id) => id !== String(bannerId));
  color.updatedAt = new Date();
  await color.save();

  await deleteBanner(bannerId);

  return color;
};
