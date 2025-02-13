// src/middleware/validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { MiddlewareFunction } from "../types/express";

export const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
    console.log("Validating data:", data); 
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        console.log("Validation error details:", error.details); 
        throw new Error(
            `Validation error: ${error.details
                .map((x) => x.message)
                .join(", ")}`
        );
    }
    console.log("Validation passed!"); 
};

export const validateRequest = (schema: ObjectSchema): MiddlewareFunction => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let dataToValidate = req.body;
            console.log("Data received in validateRequest:", dataToValidate); 

            validate(schema, dataToValidate);
            next();
        } catch (error) {
            console.log("Validation middleware error caught:", error); 
            res.status(400).json({ error: (error as Error).message });
        }
    };
};