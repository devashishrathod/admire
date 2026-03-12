const { create } = require("./create");
const { getAll } = require("./getAll");
const { get } = require("./get");
const { update } = require("./update");
const { deleteColor } = require("./delete");
const { addBanner } = require("./addBanner");
const { replaceBanner } = require("./replaceBanner");
const { removeBanner } = require("./removeBanner");

module.exports = {
  create,
  getAll,
  get,
  update,
  deleteColor,
  addBanner,
  replaceBanner,
  removeBanner,
};
