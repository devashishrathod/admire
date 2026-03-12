const FAQ = require("../../models/FAQ");
const { pagination } = require("../../utils");

exports.getAllFAQs = async (query) => {
  let {
    page,
    limit,
    search,
    question,
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

  if (question) match.question = { $regex: new RegExp(question, "i") };

  if (search) {
    match.$or = [
      { question: { $regex: new RegExp(search, "i") } },
      { answer: { $regex: new RegExp(search, "i") } },
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
  return await pagination(FAQ, pipeline, page, limit);
};
