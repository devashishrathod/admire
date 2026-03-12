const Joi = require("joi");

exports.validateCreateFAQ = (data) => {
  const createSchema = Joi.object({
    question: Joi.string().min(5).max(300).required().messages({
      "string.min": "Question has minimum {#limit} characters",
      "string.max": "Question cannot exceed {#limit} characters",
    }),
    answer: Joi.string().min(1).max(2000).required().messages({
      "string.min": "Answer has minimum {#limit} characters",
      "string.max": "Answer cannot exceed {#limit} characters",
    }),
    isActive: Joi.boolean().optional(),
  });
  return createSchema.validate(data, { abortEarly: false });
};

exports.validateUpdateFAQ = (data) => {
  const updateSchema = Joi.object({
    question: Joi.string().min(5).max(300).messages({
      "string.min": "Question has minimum {#limit} characters",
      "string.max": "Question cannot exceed {#limit} characters",
    }),
    answer: Joi.string().min(1).max(2000).messages({
      "string.min": "Answer has minimum {#limit} characters",
      "string.max": "Answer cannot exceed {#limit} characters",
    }),
    isActive: Joi.boolean().optional(),
  });
  return updateSchema.validate(data, { abortEarly: false });
};

exports.validateGetAllFAQsQuery = (payload) => {
  const getAllQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    search: Joi.string().optional(),
    question: Joi.string().optional(),
    isActive: Joi.alternatives().try(Joi.string(), Joi.boolean()).optional(),
    fromDate: Joi.date().iso().optional(),
    toDate: Joi.date().iso().optional(),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid("asc", "desc").optional(),
  });
  return getAllQuerySchema.validate(payload, { abortEarly: false });
};
