const mongoose = require("mongoose");
const Banner = require("../../models/Banner");
const { throwError } = require("../../utils");
const { uploadImage, uploadVideo } = require("../uploads");
const { BANNER_LINKED_TYPES } = require("../../constants");

const normalizeFiles = (fileOrFiles) => {
  if (!fileOrFiles) return [];
  return Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
};

exports.createBannersFromFiles = async (fileOrFiles, options = {}) => {
  const files = normalizeFiles(fileOrFiles);
  if (files.length === 0) return [];

  const { linkedType, linkedId } = options;

  if (linkedType && !Object.values(BANNER_LINKED_TYPES).includes(linkedType)) {
    throwError(422, "Invalid linkedType for banner");
  }

  const createdIds = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file?.tempFilePath) {
      throwError(422, "Invalid banner file");
    }

    const mime = String(file.mimetype || "");
    const isVideo = mime.startsWith("video/");

    let imageUrl;
    let videoUrl;
    if (isVideo) videoUrl = await uploadVideo(file.tempFilePath);
    else imageUrl = await uploadImage(file.tempFilePath);

    const doc = await Banner.create({
      linkedType,
      linkedId:
        linkedId && mongoose.Types.ObjectId.isValid(linkedId)
          ? new mongoose.Types.ObjectId(linkedId)
          : undefined,
      name: new mongoose.Types.ObjectId().toString(),
      image: imageUrl,
      video: videoUrl,
      isActive: true,
    });
    createdIds.push(doc._id);
  }

  return Array.from(new Set(createdIds.map((id) => String(id))));
};
