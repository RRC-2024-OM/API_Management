import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        const errorMessage = error.details.map(d => d.message).join(', ');
        return res.status(400).json({ error: errorMessage });
      }

      req.body = value;
      next();
    } catch (err) {
      console.error("Error during validation:", err); 
      res.status(500).json({ error: "An unexpected error occurred during validation" }); 
      next(err); 
    }
  };
};