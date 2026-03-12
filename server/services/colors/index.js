const { createColor } = require("./createColor");
const { getAllColors } = require("./getAllColors");
const { getColor } = require("./getColor");
const { updateColor } = require("./updateColor");
const { deleteColor } = require("./deleteColor");
const {
  addColorBanners,
  replaceColorBanner,
  removeColorBanner,
} = require("./banners");

module.exports = {
  createColor,
  getAllColors,
  getColor,
  updateColor,
  deleteColor,
  addColorBanners,
  replaceColorBanner,
  removeColorBanner,
};
