const Joi = require("joi");
const objectId = require("./validJoiObjectId");

exports.validateCreateFabric = (data) => {
  const createSchema = Joi.object({
    typeId: objectId().required().messages({
      "any.invalid": "Invalid typeId format",
    }),
    name: Joi.string().min(2).max(120).required().messages({
      "string.min": "Name has minimum {#limit} characters",
      "string.max": "Name cannot exceed {#limit} characters",
    }),
    code: Joi.string().allow("").optional(),
    description: Joi.string().allow("").max(300).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
    isActive: Joi.boolean().optional(),
  });
  return createSchema.validate(data, { abortEarly: false });
};

exports.validateUpdateFabric = (data) => {
  const updateSchema = Joi.object({
    typeId: objectId().optional(),
    name: Joi.string().min(2).max(120).messages({
      "string.min": "Name has minimum {#limit} characters",
      "string.max": "Name cannot exceed {#limit} characters",
    }),
    code: Joi.string().allow("").optional(),
    description: Joi.string().allow("").max(300).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
    isActive: Joi.boolean().optional(),
  });
  return updateSchema.validate(data, { abortEarly: false });
};

exports.validateGetAllFabricsQuery = (payload) => {
  const getAllQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    search: Joi.string().optional(),
    name: Joi.string().optional(),
    code: Joi.string().optional(),
    typeId: objectId().optional(),
    isActive: Joi.alternatives().try(Joi.string(), Joi.boolean()).optional(),
    fromDate: Joi.date().iso().optional(),
    toDate: Joi.date().iso().optional(),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid("asc", "desc").optional(),
  });
  return getAllQuerySchema.validate(payload, { abortEarly: false });
};
