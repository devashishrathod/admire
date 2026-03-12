const ProductVariant = require("../../models/ProductVariant");
const { throwError, validateObjectId } = require("../../utils");
const {
  createBannersFromFiles,
  deleteBanner,
  updateBanner,
} = require("../banners");

exports.addProductVariantBanners = async (variantId, bannersFiles) => {
  validateObjectId(variantId, "ProductVariant Id");
  const variant = await ProductVariant.findById(variantId);
  if (!variant || variant.isDeleted)
    throwError(404, "Product variant not found");

  const newIds = await createBannersFromFiles(bannersFiles, {
    linkedType: "variant",
    linkedId: variantId,
  });

  const current = Array.isArray(variant.banners)
    ? variant.banners.map(String)
    : [];
  variant.banners = Array.from(new Set([...current, ...newIds]));
  variant.updatedAt = new Date();
  await variant.save();
  return variant;
};

exports.replaceProductVariantBanner = async (variantId, bannerId, file) => {
  validateObjectId(variantId, "ProductVariant Id");
  validateObjectId(bannerId, "Banner Id");
  const variant = await ProductVariant.findById(variantId);
  if (!variant || variant.isDeleted)
    throwError(404, "Product variant not found");

  const ids = Array.isArray(variant.banners) ? variant.banners.map(String) : [];
  if (!ids.includes(String(bannerId)))
    throwError(404, "Banner not linked with this product variant");

  await updateBanner(bannerId, file);
  return await ProductVariant.findById(variantId);
};

exports.removeProductVariantBanner = async (variantId, bannerId) => {
  validateObjectId(variantId, "ProductVariant Id");
  validateObjectId(bannerId, "Banner Id");
  const variant = await ProductVariant.findById(variantId);
  if (!variant || variant.isDeleted)
    throwError(404, "Product variant not found");

  const ids = Array.isArray(variant.banners) ? variant.banners.map(String) : [];
  if (!ids.includes(String(bannerId)))
    throwError(404, "Banner not linked with this product variant");

  variant.banners = ids.filter((id) => id !== String(bannerId));
  variant.updatedAt = new Date();
  await variant.save();

  await deleteBanner(bannerId);

  return variant;
};
