import Joi, { ObjectSchema } from 'joi';

export const createBranchSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty"
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required",
      "string.empty": "Address cannot be empty"
    }),
    phone: Joi.string().regex(/^\d{10}$/).required().messages({
      "any.required": "Phone is required",
      "string.pattern.base": "Phone must be a 10-digit number"
    }),
  });

  export const updateBranchSchema: ObjectSchema = Joi.object({
    name: Joi.string().messages({
      "string.empty": "Name cannot be empty"
    }),
    address: Joi.string().messages({
      "string.empty": "Address cannot be empty"
    }),
    phone: Joi.string().regex(/^\d{10}$/).messages({
      "string.pattern.base": "Phone must be a 10-digit number"
    }),
  }).min(1).messages({'object.min': 'At least one field must be provided for update'});