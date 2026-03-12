const Product = require("../../models/Product");
const SubCategory = require("../../models/SubCategory");
const { throwError, validateObjectId } = require("../../utils");
const { uploadImage } = require("../uploads");
const ProductType = require("../../models/ProductType");
const { createBannersFromFiles } = require("../banners");

exports.createProduct = async (payload, image, bannersFiles) => {
  let {
    name,
    description,
    brand,
    generalPrice,
    stockQuantity,
    SKU,
    weightInKg,
    subCategoryId,
    typeId,
    dimensions,
    materials,
    origin,
    designer,
    isOutOfStock,
    isActive,
  } = payload;

  validateObjectId(subCategoryId, "SubCategory Id");
  validateObjectId(typeId, "ProductType Id");

  const subCategory = await SubCategory.findOne({
    _id: subCategoryId,
    isDeleted: false,
  });
  if (!subCategory) throwError(404, "Sub Category not found");

  const productType = await ProductType.findOne({
    _id: typeId,
    isDeleted: false,
  });
  if (!productType) throwError(404, "Product type not found");

  name = name?.toLowerCase()?.trim();
  description = description?.toLowerCase()?.trim();
  brand = brand?.toLowerCase()?.trim();
  SKU = SKU?.toUpperCase()?.trim();

  const existing = await Product.findOne({ name, isDeleted: false });
  if (existing) throwError(409, "Product already exists with this name");

  let imageUrl;
  if (image) imageUrl = await uploadImage(image.tempFilePath);

  const product = await Product.create({
    categoryId: subCategory?.categoryId,
    subCategoryId,
    typeId,
    name,
    description,
    brand,
    generalPrice,
    stockQuantity,
    SKU,
    weightInKg,
    dimensions,
    materials,
    origin,
    designer,
    image: imageUrl,
    isOutOfStock,
    isActive,
  });

  if (bannersFiles) {
    const banners = await createBannersFromFiles(bannersFiles, {
      linkedType: "product",
      linkedId: product._id,
    });
    product.banners = banners;
    product.updatedAt = new Date();
    await product.save();
  }

  return product;
};
