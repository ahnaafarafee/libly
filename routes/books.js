const express = require("express");
const books = express.Router();
const { validate, Book } = require("../models/book");
const { Genre } = require("../models/genre");
const { Author } = require("../models/author");
const checkId = require("../middleware/checkId");

books.get("/", async (req, res) => {
  const books = await Book.find().sort("published");
  res.send(books);
});

// get a book
books.get("/:id", checkId, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).send("The book with the given ID was not found!");

  res.send(book);
});

// create a book
books.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Invalid Genre");
  }

  const author = await Author.findById(req.body.authorId);
  if (!author) {
    return res.status(400).send("Invalid Author");
  }

  const books = new Book({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    image: req.body.image,
    isbn: req.body.isbn,
    description: req.body.description,
    published: req.body.published,
    price: req.body.price,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    author: {
      _id: author._id,
      name: author.name,
      bio: author.bio,
      image: author.image,
    },
  });

  await books.save();
  res.send(books);
});

// update a book
books.put("/:id", checkId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Invalid Genre");
  }

  const author = await Author.findById(req.body.authorId);
  if (!author) {
    return res.status(400).send("Invalid Author");
  }

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      image: req.body.image,
      isbn: req.body.isbn,
      description: req.body.description,
      published: req.body.published,
      price: req.body.price,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      author: {
        _id: author._id,
        name: author.name,
        bio: author.bio,
        image: author.image,
      },
    },
    { new: true }
  );

  if (!book)
    return res.status(404).send("The book with the given ID was not found!");

  res.send(book);
});

// delete a book
books.delete("/:id", checkId, async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book)
    return res.status(404).send("The book with the given ID was not found!");

  res.send("Deleted Successfully");
});

module.exports = books;
