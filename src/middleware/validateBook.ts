import { Request, Response, NextFunction } from "express";
import { authors } from "../data/authors";
import { error } from "console";

export function validateBook(req: Request, res: Response, next: NextFunction) {
    const {title, year, authorId, genre} = req.body

    if(!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({error: "Book 'title' is required."})
    }

    if(typeof year !== "number" || year < 1111) {
        return res.status(400).json({error: "Book 'year' must be a valid positive number."})
    }

    const authorExists = authors.some(a => a.id === authorId)
    if(!authorExists) {
        return res.status(400).json({error: "Invalid 'authorId': Author does not exist."})
    }

    if(genre && typeof genre !== "string") {
        return res.status(400).json({error: "Book 'genre' must be a string if provided."})
    }

    next()
}