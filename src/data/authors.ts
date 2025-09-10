import { Author } from "../models/author";

export const authors: Author[] = [
    {id: 1, name: "Shandre Cambell", birthYear: 1830},
    {id: 2, name: "Xavier Louwe", birthYear: 1981}
]

let nextId = Math.max(...authors.map(a => a.id), 0) + 1

export function generateAuthorId(): number {
    return nextId++
}