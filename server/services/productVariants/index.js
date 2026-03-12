const { createProductVariant } = require("./createProductVariant");
const { getAllProductVariants } = require("./getAllProductVariants");
const { getProductVariant } = require("./getProductVariant");
const { updateProductVariant } = require("./updateProductVariant");
const { deleteProductVariant } = require("./deleteProductVariant");
const {
  addProductVariantBanners,
  replaceProductVariantBanner,
  removeProductVariantBanner,
} = require("./banners");

module.exports = {
  createProductVariant,
  getAllProductVariants,
  getProductVariant,
  updateProductVariant,
  deleteProductVariant,
  addProductVariantBanners,
  replaceProductVariantBanner,
  removeProductVariantBanner,
};
