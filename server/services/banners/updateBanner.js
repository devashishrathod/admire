const Banner = require("../../models/Banner");
const { throwError, validateObjectId } = require("../../utils");
const {
  uploadImage,
  uploadVideo,
  deleteAudioOrVideo,
  deleteImage,
} = require("../uploads");

exports.updateBanner = async (id, file, payload = {}) => {
  validateObjectId(id, "Banner Id");
  const banner = await Banner.findById(id);
  if (!banner || banner.isDeleted) throwError(404, "Banner not found");

  if (!file?.tempFilePath) throwError(422, "Banner file is required");

  const mime = String(file.mimetype || "");
  const isVideo = mime.startsWith("video/");

  if (isVideo) {
    await deleteImage(banner?.image);
    banner.image = null;
    banner.video = await uploadVideo(file.tempFilePath);
  } else {
    await deleteAudioOrVideo(banner?.video);
    banner.video = null;
    banner.image = await uploadImage(file.tempFilePath);
  }

  if (typeof payload?.name !== "undefined") banner.name = payload.name;
  if (typeof payload?.description !== "undefined")
    banner.description = payload.description;
  if (typeof payload?.isActive !== "undefined")
    banner.isActive = payload.isActive;

  banner.updatedAt = new Date();
  await banner.save();
  return banner;
};
