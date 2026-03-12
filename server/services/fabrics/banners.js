const Fabric = require("../../models/Fabric");
const { throwError, validateObjectId } = require("../../utils");
const { createBannersFromFiles, deleteBanner, updateBanner } = require("../banners");

exports.addFabricBanners = async (fabricId, bannersFiles) => {
  validateObjectId(fabricId, "Fabric Id");
  const fabric = await Fabric.findById(fabricId);
  if (!fabric || fabric.isDeleted) throwError(404, "Fabric not found");

  const newIds = await createBannersFromFiles(bannersFiles, {
    linkedType: "fabric",
    linkedId: fabricId,
  });

  const current = Array.isArray(fabric.banners) ? fabric.banners.map(String) : [];
  fabric.banners = Array.from(new Set([...current, ...newIds]));
  fabric.updatedAt = new Date();
  await fabric.save();
  return fabric;
};

exports.replaceFabricBanner = async (fabricId, bannerId, file) => {
  validateObjectId(fabricId, "Fabric Id");
  validateObjectId(bannerId, "Banner Id");
  const fabric = await Fabric.findById(fabricId);
  if (!fabric || fabric.isDeleted) throwError(404, "Fabric not found");

  const ids = Array.isArray(fabric.banners) ? fabric.banners.map(String) : [];
  if (!ids.includes(String(bannerId))) throwError(404, "Banner not linked with this fabric");

  await updateBanner(bannerId, file);
  return await Fabric.findById(fabricId);
};

exports.removeFabricBanner = async (fabricId, bannerId) => {
  validateObjectId(fabricId, "Fabric Id");
  validateObjectId(bannerId, "Banner Id");
  const fabric = await Fabric.findById(fabricId);
  if (!fabric || fabric.isDeleted) throwError(404, "Fabric not found");

  const ids = Array.isArray(fabric.banners) ? fabric.banners.map(String) : [];
  if (!ids.includes(String(bannerId))) throwError(404, "Banner not linked with this fabric");

  fabric.banners = ids.filter((id) => id !== String(bannerId));
  fabric.updatedAt = new Date();
  await fabric.save();

  await deleteBanner(bannerId);

  return fabric;
};
