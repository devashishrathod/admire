const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { createProduct } = require("../../services/products");
const { validateCreateProduct } = require("../../validator/products");

exports.create = asyncWrapper(async (req, res) => {
  const { error, value } = validateCreateProduct(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const image = req.files?.image;
  const banners = req.files?.banners;
  const product = await createProduct(value, image, banners);
  return sendSuccess(res, 201, "Product created", product);
});
