const Product = require("../../models/Product");
const SubCategory = require("../../models/SubCategory");
const ProductType = require("../../models/ProductType");
const { throwError, validateObjectId } = require("../../utils");
const { uploadImage, deleteImage } = require("../uploads");

exports.updateProduct = async (id, payload, image) => {
  validateObjectId(id, "Product Id");
  const product = await Product.findById(id);
  if (!product || product.isDeleted) throwError(404, "Product not found");

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

  if (typeof subCategoryId !== "undefined") {
    validateObjectId(subCategoryId, "SubCategory Id");
    const subCategory = await SubCategory.findOne({
      _id: subCategoryId,
      isDeleted: false,
    });
    if (!subCategory) throwError(404, "Sub Category not found");
    product.subCategoryId = subCategoryId;
    product.categoryId = subCategory?.categoryId;
  }

  if (typeof typeId !== "undefined") {
    validateObjectId(typeId, "ProductType Id");
    const productType = await ProductType.findOne({
      _id: typeId,
      isDeleted: false,
    });
    if (!productType) throwError(404, "Product type not found");
    product.typeId = typeId;
  }

  if (typeof name !== "undefined") {
    const normalized = name?.toLowerCase()?.trim();
    const existing = await Product.findOne({
      _id: { $ne: id },
      name: normalized,
      isDeleted: false,
    });
    if (existing) throwError(409, "Product already exists with this name");
    product.name = normalized;
  }

  if (typeof description !== "undefined") {
    product.description = description?.toLowerCase()?.trim();
  }
  if (typeof brand !== "undefined")
    product.brand = brand?.toLowerCase()?.trim();
  if (typeof generalPrice !== "undefined") product.generalPrice = generalPrice;
  if (typeof stockQuantity !== "undefined")
    product.stockQuantity = stockQuantity;
  if (typeof SKU !== "undefined") product.SKU = SKU?.toUpperCase()?.trim();
  if (typeof weightInKg !== "undefined") product.weightInKg = weightInKg;
  if (typeof dimensions !== "undefined")
    product.dimensions = { ...product.dimensions, ...dimensions };
  if (typeof materials !== "undefined") product.materials = materials;
  if (typeof origin !== "undefined")
    product.origin = origin?.toLowerCase()?.trim();
  if (typeof designer !== "undefined")
    product.designer = designer?.toLowerCase()?.trim();
  if (typeof isOutOfStock !== "undefined") product.isOutOfStock = isOutOfStock;
  if (typeof isActive !== "undefined") product.isActive = isActive;

  if (image) {
    await deleteImage(product?.image);
    product.image = await uploadImage(image.tempFilePath);
  }

  product.updatedAt = new Date();
  await product.save();
  return product;
};
