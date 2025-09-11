import express from "express";
import logger from "./middleware/logger";
import authorRouter from "./routes/authors";
import booksRouter from "./routes/books";
import { errorHandler } from "./middleware/errorHandler";

const app = express()

app.use(express.json())
app.use(logger)

app.get("/", (req, res) => {
    res.json({message: "Library API"})
})

app.use("/authors", authorRouter)
app.use("/books", booksRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})