import express, { Request, Response } from "express";
import { authors, generateAuthorId } from "../data/authors";
import { Author } from "../models/author";
import { error } from "console";
import { AppError } from "../utils/AppError";
import { books } from "../data/books";

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.json(authors)
})

router.post("/", (req: Request, res: Response) => {
    const {name, birthYear, bio} = req.body

    if(!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({error: "Author 'name' is required."})
    }

    const newAuthor: Author = {
        id: generateAuthorId(),
        name: name.trim(),
        birthYear: typeof birthYear === "number" ? birthYear : undefined,
        bio: typeof bio === "string" ? bio : undefined
    }

    authors.push(newAuthor)
    return res.status(201).json(newAuthor)
})

router.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if(Number.isNaN(id)) {
        return res.status(400).json({error: "Invalid author id."})
    }

    const author = authors.find(a => a.id === id)
    if(!author){
        return res.status(404).json({error: "Author not found."})
    }
    
    const {name, birthYear, bio} = req.body
    
    if(!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({error: "Author 'name' is required."})
    }

    author.name = name.trim()
    author.birthYear = typeof birthYear === "number" ? birthYear : author.birthYear
    author.bio = typeof bio === "string" ? bio : author.bio

    return res.json(author)
})

router.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if(Number.isNaN(id)) {
        return res.status(400).json({error: "Invalid author id."})
    }

    const idx = authors.findIndex(a => a.id === id)
    if(idx === -1) {
        return res.status(404).json({error: "Author not found."})
    }

    authors.splice(idx, 1)
    return res.status(204).end()
})

router.get("/:id/books", (req, res, next) => {
    try {
        const authorId = Number(req.params.id)
        if(Number.isNaN(authorId)) {
            throw new AppError("Invalid author id.", 400)
        }

        const authorBooks = books.filter(b => b.authorId === authorId)
        if(authorBooks.length === 0) {
            return res.json([])
        }

        return res.json(authorBooks)
    } catch (err) {
        next(err)
    }
})

export default router;