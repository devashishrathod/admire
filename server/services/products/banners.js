const Product = require("../../models/Product");
const { throwError, validateObjectId } = require("../../utils");
const { createBannersFromFiles, deleteBanner, updateBanner } = require("../banners");

exports.addProductBanners = async (productId, bannersFiles) => {
  validateObjectId(productId, "Product Id");
  const product = await Product.findById(productId);
  if (!product || product.isDeleted) throwError(404, "Product not found");

  const newIds = await createBannersFromFiles(bannersFiles, {
    linkedType: "product",
    linkedId: productId,
  });

  const current = Array.isArray(product.banners) ? product.banners.map(String) : [];
  product.banners = Array.from(new Set([...current, ...newIds]));
  product.updatedAt = new Date();
  await product.save();
  return product;
};

exports.replaceProductBanner = async (productId, bannerId, file) => {
  validateObjectId(productId, "Product Id");
  validateObjectId(bannerId, "Banner Id");
  const product = await Product.findById(productId);
  if (!product || product.isDeleted) throwError(404, "Product not found");

  const ids = Array.isArray(product.banners) ? product.banners.map(String) : [];
  if (!ids.includes(String(bannerId))) throwError(404, "Banner not linked with this product");

  await updateBanner(bannerId, file);
  return await Product.findById(productId);
};

exports.removeProductBanner = async (productId, bannerId) => {
  validateObjectId(productId, "Product Id");
  validateObjectId(bannerId, "Banner Id");
  const product = await Product.findById(productId);
  if (!product || product.isDeleted) throwError(404, "Product not found");

  const ids = Array.isArray(product.banners) ? product.banners.map(String) : [];
  if (!ids.includes(String(bannerId))) throwError(404, "Banner not linked with this product");

  product.banners = ids.filter((id) => id !== String(bannerId));
  product.updatedAt = new Date();
  await product.save();

  await deleteBanner(bannerId);

  return product;
};
