const {
  asyncWrapper,
  sendSuccess,
  throwError,
  validateObjectId,
} = require("../../utils");
const { getFAQ } = require("../../services/faqs");

exports.get = asyncWrapper(async (req, res) => {
  validateObjectId(req.params?.id, "FAQ Id");
  const result = await getFAQ(req.params?.id);
  if (!result) throwError(404, "FAQ not found");
  return sendSuccess(res, 200, "FAQ fetched", result);
});
