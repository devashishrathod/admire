const { createProduct } = require("./createProduct");
const { getProduct } = require("./getProduct");
const { getAllProducts } = require("./getAllProducts");
const { updateProduct } = require("./updateProduct");
const { deleteProduct } = require("./deleteProduct");
const {
  addProductBanners,
  replaceProductBanner,
  removeProductBanner,
} = require("./banners");

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addProductBanners,
  replaceProductBanner,
  removeProductBanner,
};
