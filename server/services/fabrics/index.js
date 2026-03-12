const { createFabric } = require("./createFabric");
const { getAllFabrics } = require("./getAllFabrics");
const { getFabric } = require("./getFabric");
const { updateFabric } = require("./updateFabric");
const { deleteFabric } = require("./deleteFabric");
const {
  addFabricBanners,
  replaceFabricBanner,
  removeFabricBanner,
} = require("./banners");

module.exports = {
  createFabric,
  getAllFabrics,
  getFabric,
  updateFabric,
  deleteFabric,
  addFabricBanners,
  replaceFabricBanner,
  removeFabricBanner,
};
