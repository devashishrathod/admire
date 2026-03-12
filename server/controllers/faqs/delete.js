const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteFAQ } = require("../../services/faqs");

exports.deleteFAQ = asyncWrapper(async (req, res) => {
  await deleteFAQ(req.params?.id);
  return sendSuccess(res, 200, "FAQ deleted");
});
