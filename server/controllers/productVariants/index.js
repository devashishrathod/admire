const { create } = require("./create");
const { getAll } = require("./getAll");
const { get } = require("./get");
const { update } = require("./update");
const { deleteProductVariant } = require("./delete");
const { addBanner } = require("./addBanner");
const { replaceBanner } = require("./replaceBanner");
const { removeBanner } = require("./removeBanner");

module.exports = {
  create,
  getAll,
  get,
  update,
  deleteProductVariant,
  addBanner,
  replaceBanner,
  removeBanner,
};
