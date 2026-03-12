const Color = require("../../models/Color");
const { pagination } = require("../../utils");

exports.getAllColors = async (query) => {
  let {
    page,
    limit,
    search,
    name,
    hexCode,
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
  if (name) match.name = { $regex: new RegExp(name, "i") };
  if (hexCode) match.hexCode = { $regex: new RegExp(hexCode, "i") };
  if (search) {
    match.$or = [
      { name: { $regex: new RegExp(search, "i") } },
      { description: { $regex: new RegExp(search, "i") } },
      { hexCode: { $regex: new RegExp(search, "i") } },
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

  const pipeline = [{ $match: match }];
  const sortStage = {};
  sortStage[sortBy] = sortOrder === "asc" ? 1 : -1;
  pipeline.push({ $sort: sortStage });
  return await pagination(Color, pipeline, page, limit);
};
