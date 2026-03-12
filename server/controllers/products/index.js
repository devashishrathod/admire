const { create } = require("./create");
const { getAll } = require("./getAll");
const { getOne } = require("./getOne");
const { update } = require("./update");
const { deleteProduct } = require("./deleteProduct");
const { addBanner } = require("./addBanner");
const { replaceBanner } = require("./replaceBanner");
const { removeBanner } = require("./removeBanner");
const { addProductLocations } = require("./addProductLocations");
const { removeProductLocations } = require("./removeProductLocations");

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteProduct,
  addBanner,
  replaceBanner,
  removeBanner,
  removeProductLocations,
  addProductLocations,
};
