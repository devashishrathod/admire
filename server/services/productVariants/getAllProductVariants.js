const mongoose = require("mongoose");
const ProductVariant = require("../../models/ProductVariant");
const { pagination } = require("../../utils");

exports.getAllProductVariants = async (query) => {
  let {
    page,
    limit,
    search,
    productId,
    fabricId,
    colorId,
    SKU,
    price,
    minPrice,
    maxPrice,
    stockQuantity,
    minStock,
    maxStock,
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

  if (productId) match.productId = new mongoose.Types.ObjectId(productId);
  if (fabricId) match.fabricId = new mongoose.Types.ObjectId(fabricId);
  if (colorId) match.colorId = new mongoose.Types.ObjectId(colorId);

  if (SKU) match.SKU = SKU?.toUpperCase();

  if (search) {
    match.$or = [
      { name: { $regex: new RegExp(search, "i") } },
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

  if (price) match.price = price;
  else if (minPrice || maxPrice) {
    match.price = {};
    if (minPrice) match.price.$gte = Number(minPrice);
    if (maxPrice) match.price.$lte = Number(maxPrice);
  }

  if (stockQuantity) match.stockQuantity = stockQuantity;
  else if (minStock || maxStock) {
    match.stockQuantity = {};
    if (minStock) match.stockQuantity.$gte = Number(minStock);
    if (maxStock) match.stockQuantity.$lte = Number(maxStock);
  }

  const pipeline = [{ $match: match }];
  const sortStage = {};
  sortStage[sortBy] = sortOrder === "asc" ? 1 : -1;
  pipeline.push({ $sort: sortStage });
  return await pagination(ProductVariant, pipeline, page, limit);
};
