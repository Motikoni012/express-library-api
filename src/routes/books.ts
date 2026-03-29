import express, { NextFunction, Request, Response } from "express";
import { books, generateBookId } from "../data/books";
import { Book } from "../models/book";
import { validateBook } from "../middleware/validateBook";
import { error } from "console";
import { AppError } from "../utils/AppError";

const router = express.Router()

router.get("/", (req, res, next) => {
    try {
        let result = [...books]

        const {search, year} = req.query

        if(search && typeof search === "string") {
            const lower = search.toLowerCase()
            result = result.filter(b => b.title.toLowerCase().includes(lower))
        }

        if(year) {
            const y = Number(year)
            if(!Number.isNaN(y)) {
                result = result.filter(b => b.year === y)
            }

            const {sort} = req.query
            if(sort === "title" || sort === "year") {
                result.sort((a, b) => {
                    const va = a[sort]
                    const vb = b[sort]
                    return va > vb ? 1 : va < vb ? -1 : 0
                })
            }

            const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined
            const page = req.query.page ? parseInt(req.query.page as string, 10) : 1

            if(limit && limit > 0) {
                const start = (page - 1) * limit
                result = result.slice(start, start + limit)
            }

            res.json(result)
        }
    } catch (err) {
        next(err)
    }
})

router.post("/", validateBook, (req: Request, res: Response) => {
    const {title, year, authorId, genre} = req.body

    const newBook: Book = {
        id: generateBookId(),
        title: title.trim(),
        year,
        authorId,
        genre
    }

    books.push(newBook)
    return res.status(201).json(newBook)
})

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            throw new AppError("Invalid book id.")
        }

        const book = books.find(b => b.id === id)
        if(!book) {
            throw new AppError("Book not found", 404)
        }

        res.json(book)
    } catch (error) {
        next(error)
    }
})

router.put("/:id", validateBook, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if(Number.isNaN(id)) {
        return res.status(400).json({error: "Invalid book id."})
    }

    const book = books.find(b => b.id === id)
    if(!book) {
        return res.status(404).json({error: "Book not found."})
    }

    const {title, year, authorId, genre} = req.body

    book.title = title.trim()
    book.year = year
    book.authorId = authorId
    book.genre = genre

    return res.json(book)
})

router.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if(Number.isNaN(id)) {
        return res.status(400).json({error: "Invalid books id."})
    }

    const idx = books.findIndex(b => b.id === id)
    if(idx === -1) {
        return res.status(404).json({error: "Book not found."})
    }

    books.splice(idx, 1)
    return res.status(204).end()
})

export default router;