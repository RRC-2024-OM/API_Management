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
        "number.base": "Branch ID must be a number" // Added message for number type
    }),
});

export const updateEmployeeSchema: ObjectSchema = Joi.object({
    name: Joi.string().messages({
      "string.empty": "Name cannot be empty"
    }),