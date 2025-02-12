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
