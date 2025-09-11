import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { error } from "console";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({error: err.message})
    }

    console.error("Unexpected error:", err)
    return res.status(500).json({error: "Internal Server Error"})
}