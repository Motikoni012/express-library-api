import { Book } from "../models/book";

export const books: Book[] = [
    {id: 1, title: "The Forgotten Kingdom", year: 1868, authorId: 1, genre: "Historical Fiction"},
    {id: 2, title: "Until the Last Dawn", year: 2007, authorId: 2, genre: "Novel"}
]

let nextBookId = Math.max(...books.map(b => b.id), 0) + 1

export function generateBookId(): number {
    return nextBookId++
}