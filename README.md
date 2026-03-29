````md
# Express-Library-Api

# Description

A simple RESTful API built with **Node.js**, **TypeScript**, and **Express JS** for managing a book library.  
Supports CRUD operations (Create, Read, Update, Delete) for both **Authors** and **Books** using JSON data.

# Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Motikoni012/express-library-api.git
   cd express-library-api
   code .
````

2. Install dependencies

   ```bash
   git checkout dev
   npm install
   ```

# Usage

1. Run Project

   ```bash
   npm run dev
   ```

---

# API Endpoints

* NB: Use [https://www.postman.com/](https://www.postman.com/) for endpoint testing
* Base URL:

```
http://localhost:3000
```

(Or your preferred port — can be changed in `server.ts`)

---

## Authors Endpoints

### Get all authors

`GET /authors`

---

### Get single author

`GET /authors/id`

---

### Add new author

`POST /authors`

**Request body:**

```json
 {id: 1, name: "Shandre Cambell", birthYear: 1830}
```

---

### Update author

`PUT /authors/id`

**Request body:**

```json
 {id: 1, name: "Shandre Cambell", birthYear: 1830}
```

---

### Delete author

`DELETE /authors/id`

---

## Books Endpoints

### Get all books

`GET /books`

---

### Get single book

`GET /books/id`

---

### Add new book

`POST /books`

**Request body:**

```json
{id: 2, title: "Until the Last Dawn", year: 2007, authorId: 2, genre: "Novel"}
```

---

### Update book

`PUT /books/id`

**Request body:**

```json
{id: 1, title: "The Forgotten Kingdom", year: 1868, authorId: 1, genre: "Historical Fiction"}
```

---

### Delete book

`DELETE /books/id`

---

### Get books by author

`GET /authors/id/books`

---

# Scripts

```bash
npm run dev     # Run development server
npm run build   # Compile TypeScript
npm start       # Run production build
```

---

# Project Structure

```bash
src/
├── data/          # Request handlers
│   ├── authors.ts         # Author request handlers
│   └── books.ts           # Book request handlers
├── middleware/           # Middleware handlers
│   ├── errorHandler.ts       # Error handling middleware
│   ├── logger.ts      # Request logger middleware
│   └── validationBook.ts  # Validation middleware
├── models/               # Data models
│   ├── author.ts         # Author model
│   └── book.ts           # Book model
├── routes/               # API routes
│   ├── authors.ts         # Authors router
│   └── books.ts           # Books router
└── server.ts             # App entry point
```

---

# Technologies

* Node.js
* TypeScript
* Express.js
* Postman (for API testing)
