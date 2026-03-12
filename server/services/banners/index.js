const { createBanner } = require("./createBanner");
const { createBannersFromFiles } = require("./createBannersFromFiles");
const { getAllBanners } = require("./getAllBanners");
const { getBanner } = require("./getBanner");
const { deleteBanner } = require("./deleteBanner");
const { updateBanner } = require("./updateBanner");

module.exports = {
  createBanner,
  createBannersFromFiles,
  getAllBanners,
  getBanner,
  updateBanner,
  deleteBanner,
};
