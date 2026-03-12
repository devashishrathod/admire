const Joi = require("joi");
const objectId = require("./validJoiObjectId");

exports.validateCreateProduct = (data) => {
  const createSchema = Joi.object({
    name: Joi.string().min(2).max(120).required().messages({
      "string.min": "Name has minimum {#limit} characters",
      "string.max": "Name cannot exceed {#limit} characters",
    }),
    description: Joi.string().allow("").max(500).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
    typeId: objectId().required().messages({
      "any.invalid": "Invalid typeId format",
    }),
    subCategoryId: objectId().required().messages({
      "any.invalid": "Invalid subCategoryId format",
    }),
    brand: Joi.string().allow("").max(120).optional(),
    generalPrice: Joi.number().min(0).required().messages({
      "number.min": "General Price cannot be negative",
    }),
    stockQuantity: Joi.number().min(0).required().messages({
      "number.min": "Stock Quantity cannot be negative",
    }),
    SKU: Joi.string().min(2).max(120).required().messages({
      "string.min": "SKU has minimum {#limit} characters",
      "string.max": "SKU cannot exceed {#limit} characters",
    }),
    weightInKg: Joi.number().min(0).required().messages({
      "number.min": "Weight in Kg cannot be negative",
    }),
    dimensions: Joi.object({
      unit: Joi.string().valid("mm", "cm", "in").optional(),
      length: Joi.number().min(0).optional(),
      width: Joi.number().min(0).optional(),
      height: Joi.number().min(0).optional(),
    }).optional(),
    materials: Joi.array().items(Joi.string()).optional(),
    origin: Joi.string().allow("").max(120).optional(),
    designer: Joi.string().allow("").max(120).optional(),
    isOutOfStock: Joi.boolean().optional(),
    isActive: Joi.boolean().optional(),
  });
  return createSchema.validate(data, { abortEarly: false });
};

exports.validateUpdateProduct = (data) => {
  const updateSchema = Joi.object({
    name: Joi.string().min(2).max(120).messages({
      "string.min": "Name has minimum {#limit} characters",
      "string.max": "Name cannot exceed {#limit} characters",
    }),
    description: Joi.string().allow("").max(500).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
    typeId: objectId().optional(),
    subCategoryId: objectId().optional(),
    brand: Joi.string().allow("").max(120).optional(),
    generalPrice: Joi.number().min(0).optional(),
    stockQuantity: Joi.number().min(0).optional(),
    SKU: Joi.string().min(2).max(120).optional(),
    weightInKg: Joi.number().min(0).optional(),
    dimensions: Joi.object({
      unit: Joi.string().valid("mm", "cm", "in").optional(),
      length: Joi.number().min(0).optional(),
      width: Joi.number().min(0).optional(),
      height: Joi.number().min(0).optional(),
    }).optional(),
    materials: Joi.array().items(Joi.string()).optional(),
    origin: Joi.string().allow("").max(120).optional(),
    designer: Joi.string().allow("").max(120).optional(),
    isOutOfStock: Joi.boolean().optional(),
    isActive: Joi.boolean().optional(),
  });
  return updateSchema.validate(data, { abortEarly: false });
};

exports.validateGetAllProductsQuery = (payload) => {
  const getAllQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    search: Joi.string().optional(),
    name: Joi.string().optional(),
    brand: Joi.string().optional(),
    categoryId: objectId().optional(),
    subCategoryId: objectId().optional(),
    typeId: objectId().optional(),
    SKU: Joi.string().optional(),
    price: Joi.number().optional(),
    minPrice: Joi.number().optional(),
    maxPrice: Joi.number().optional(),
    weightInKg: Joi.number().optional(),
    minWeight: Joi.number().optional(),
    maxWeight: Joi.number().optional(),
    volume: Joi.number().optional(),
    minVolume: Joi.number().optional(),
    maxVolume: Joi.number().optional(),
    stockQuantity: Joi.number().optional(),
    minStock: Joi.number().optional(),
    maxStock: Joi.number().optional(),
    isOutOfStock: Joi.alternatives()
      .try(Joi.boolean(), Joi.string())
      .optional(),
    isActive: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
    fromDate: Joi.date().iso().optional(),
    toDate: Joi.date().iso().optional(),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid("asc", "desc").optional(),
  });
  return getAllQuerySchema.validate(payload, { abortEarly: false });
};
