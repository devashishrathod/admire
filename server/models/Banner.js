const mongoose = require("mongoose");
const { DEFAULT_IMAGES, BANNER_LINKED_TYPES } = require("../constants");

const bannerSchema = new mongoose.Schema(
  {
    linkedId: mongoose.Schema.Types.ObjectId,
    linkedType: {
      type: String,
      enum: Object.values(BANNER_LINKED_TYPES),
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, default: DEFAULT_IMAGES.BANNER },
    video: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Banner", bannerSchema);
