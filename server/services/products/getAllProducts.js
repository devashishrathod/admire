const mongoose = require("mongoose");
const Product = require("../../models/Product");
const { pagination } = require("../../utils");

exports.getAllProducts = async (query) => {
  let {
    page,
    limit,
    search,
    name,
    brand,
    categoryId,
    subCategoryId,
    SKU,
    typeId,
    price,
    minPrice,
    maxPrice,
    weightInKg,
    minWeight,
    maxWeight,
    volume,
    minVolume,
    maxVolume,
    stockQuantity,
    minStock,
    maxStock,
    isOutOfStock,
    isActive,
    fromDate,
    toDate,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;
  page = page ? Number(page) : 1;
  limit = limit ? Number(limit) : 10;
  const match = { isDeleted: false };
  if (typeof isActive !== "undefined") {
    match.isActive = isActive === "true" || isActive === true;
  }
  if (typeof isOutOfStock !== "undefined") {
    match.isOutOfStock = isOutOfStock === "true" || isOutOfStock === true;
  }
  if (categoryId) match.categoryId = new mongoose.Types.ObjectId(categoryId);
  if (subCategoryId) {
    match.subCategoryId = new mongoose.Types.ObjectId(subCategoryId);
  }
  if (typeId) match.typeId = new mongoose.Types.ObjectId(typeId);
  if (SKU) {
    SKU = SKU?.toUpperCase();
    match.SKU = SKU;
  }
  if (name) match.name = { $regex: new RegExp(name, "i") };
  if (brand) match.brand = { $regex: new RegExp(brand, "i") };
  if (search) {
    match.$or = [
      { name: { $regex: new RegExp(search, "i") } },
      { brand: { $regex: new RegExp(search, "i") } },
      { description: { $regex: new RegExp(search, "i") } },
      { SKU: { $regex: new RegExp(search, "i") } },
    ];
  }
  if (fromDate || toDate) {
    match.createdAt = {};
    if (fromDate) match.createdAt.$gte = new Date(fromDate);
    if (toDate) {
      const d = new Date(toDate);
      d.setHours(23, 59, 59, 999);
      match.createdAt.$lte = d;
    }
  }
  if (price) match.generalPrice = price;
  else if (minPrice || maxPrice) {
    match.generalPrice = {};
    if (minPrice) match.generalPrice.$gte = Number(minPrice);
    if (maxPrice) match.generalPrice.$lte = Number(maxPrice);
  }
  if (weightInKg) match.weightInKg = weightInKg;
  else if (minWeight || maxWeight) {
    match.weightInKg = {};
    if (minWeight) match.weightInKg.$gte = Number(minWeight);
    if (maxWeight) match.weightInKg.$lte = Number(maxWeight);
  }
  if (volume) match["dimensions.volume"] = volume;
  else if (minVolume || maxVolume) {
    match["dimensions.volume"] = {};
    if (minVolume) match["dimensions.volume"].$gte = Number(minVolume);
    if (maxVolume) match["dimensions.volume"].$lte = Number(maxVolume);
  }
  if (stockQuantity) match.stockQuantity = stockQuantity;
  else if (minStock || maxStock) {
    match.stockQuantity = {};
    if (minStock) match.stockQuantity.$gte = Number(minStock);
    if (maxStock) match.stockQuantity.$lte = Number(maxStock);
  }
  const pipeline = [{ $match: match }];
  pipeline.push({
    $project: {
      name: 1,
      brand: 1,
      categoryId: 1,
      subCategoryId: 1,
      typeId: 1,
      generalPrice: 1,
      stockQuantity: 1,
      SKU: 1,
      weightInKg: 1,
      description: 1,
      image: 1,
      banners: 1,
      isOutOfStock: 1,
      dimensions: 1,
      isActive: 1,
      createdAt: 1,
    },
  });
  const sortStage = {};
  sortStage[sortBy] = sortOrder === "asc" ? 1 : -1;
  pipeline.push({ $sort: sortStage });
  return await pagination(Product, pipeline, page, limit);
};
