const Joi = require("joi");
const objectId = require("./validJoiObjectId");

exports.validateCreateProductVariant = (data) => {
  const createSchema = Joi.object({
    productId: objectId().required().messages({
      "any.invalid": "Invalid productId format",
    }),
    fabricId: objectId().optional().allow(null, ""),
    colorId: objectId().required().messages({
      "any.invalid": "Invalid colorId format",
    }),
    name: Joi.string().min(2).max(120).required().messages({
      "string.min": "Name has minimum {#limit} characters",
      "string.max": "Name cannot exceed {#limit} characters",
    }),
    description: Joi.string().allow("").max(500).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
    SKU: Joi.string().min(2).max(120).required().messages({
      "string.min": "SKU has minimum {#limit} characters",
      "string.max": "SKU cannot exceed {#limit} characters",
    }),
    price: Joi.number().min(0).required().messages({
      "number.min": "Price cannot be negative",
    }),
    stockQuantity: Joi.number().min(0).optional().messages({
      "number.min": "Stock Quantity cannot be negative",
    }),
    isActive: Joi.boolean().optional(),
  });
  return createSchema.validate(data, { abortEarly: false });
};

exports.validateUpdateProductVariant = (data) => {
  const updateSchema = Joi.object({
    productId: objectId().optional(),
    fabricId: objectId().optional().allow(null, ""),
    colorId: objectId().optional(),
    name: Joi.string().min(2).max(120).messages({
      "string.min": "Name has minimum {#limit} characters",
      "string.max": "Name cannot exceed {#limit} characters",
    }),
    description: Joi.string().allow("").max(500).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
    SKU: Joi.string().min(2).max(120).messages({
      "string.min": "SKU has minimum {#limit} characters",
      "string.max": "SKU cannot exceed {#limit} characters",
    }),
    price: Joi.number().min(0).optional().messages({
      "number.min": "Price cannot be negative",
    }),
    stockQuantity: Joi.number().min(0).optional().messages({
      "number.min": "Stock Quantity cannot be negative",
    }),
    isActive: Joi.boolean().optional(),
  });
  return updateSchema.validate(data, { abortEarly: false });
};

exports.validateGetAllProductVariantsQuery = (payload) => {
  const getAllQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    search: Joi.string().optional(),
    productId: objectId().optional(),
    fabricId: objectId().optional(),
    colorId: objectId().optional(),
    SKU: Joi.string().optional(),
    price: Joi.number().optional(),
    minPrice: Joi.number().optional(),
    maxPrice: Joi.number().optional(),
    stockQuantity: Joi.number().optional(),
    minStock: Joi.number().optional(),
    maxStock: Joi.number().optional(),
    isActive: Joi.alternatives().try(Joi.string(), Joi.boolean()).optional(),
    fromDate: Joi.date().iso().optional(),
    toDate: Joi.date().iso().optional(),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid("asc", "desc").optional(),
  });
  return getAllQuerySchema.validate(payload, { abortEarly: false });
};
