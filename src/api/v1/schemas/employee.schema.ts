import Joi, { ObjectSchema } from 'joi';

export const createEmployeeSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty" 
    }),
    position: Joi.string().required().messages({
        "any.required": "Department is required",
        "string.empty": "Position cannot be empty"
    }),
    department: Joi.string().required().messages({
        "any.required": "Department is required",
        "string.empty": "Department cannot be empty"
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid email"
    }),
    phone: Joi.string().regex(/^\d{10}$/).required().messages({
        "any.required": "Phone is required",
        "string.pattern.base": "Phone must be a 10-digit number"
    }),
    branchId: Joi.number().required().messages({
        "any.required": "Branch ID is required",
        "number.base": "Branch ID must be a number" 
    }),
});

export const updateEmployeeSchema: ObjectSchema = Joi.object({
    name: Joi.string().messages({
      "string.empty": "Name cannot be empty"
    }),
    position: Joi.string().messages({
        "string.empty": "Position cannot be empty"
    }),
    department: Joi.string().messages({
        "string.empty": "Department cannot be empty"
    }),
    email: Joi.string().email().messages({
        "string.email": "Email must be a valid email"
    }),
    phone: Joi.string().regex(/^\d{10}$/).messages({
        "string.pattern.base": "Phone must be a 10-digit number"
      }),
      branchId: Joi.number().messages({
        "number.base": "Branch ID must be a number"
      }),
    }).min(1).messages({'object.min': 'At least one field must be provided for update'});