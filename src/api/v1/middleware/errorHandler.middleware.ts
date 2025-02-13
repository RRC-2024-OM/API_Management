import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("ERROR HANDLER MIDDLEWARE TRIGGERED:", err); // Log the error for debugging

    res.status(500).json({
        message: "Something went wrong on the server.",
        error: err.message || "Unknown error", 
    });
};