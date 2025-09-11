import express, { Request, Response } from "express";
import { books, generateBookId } from "../data/books";
import { Book } from "../models/book";
import { validateBook } from "../middleware/validateBook";
import { error } from "console";

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.json(books)
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

router.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        return res.status(400).json({error: "Invalid book id."})
    }

    const book = books.find(b => b.id === id)
    if(!book) {
        return res.status(404).json({error: "Book not found."})
    }

    return res.json(book)
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