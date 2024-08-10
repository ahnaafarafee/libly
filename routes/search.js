const express = require("express");
const { Book } = require("../models/book");
const { Author } = require("../models/author");
const search = express.Router();

// for search bar
search.get("/", async (req, res) => {
  const { search } = req.query;
  const regex = new RegExp(search, "i");

  const books = await Book.find({ title: { $regex: regex } });
  const author = await Author.find({ name: { $regex: regex } });

  const result = [...books, ...author];

  res.send(result);
});

// for searching books
search.get("/books", async (req, res) => {
  const { search, sortBy, pageNum, pageSize } = req.query;
  let sortOptions = {};
  if (sortBy === "desc") {
    sortOptions = { published: -1 };
  } else if (sortBy === "asc") {
    sortOptions = { published: 1 };
  } else {
    sortOptions = { published: -1 };
  }
  const regex = new RegExp(search, "i");
  const books = await Book.find({ title: { $regex: regex } })
    .sort(sortOptions)
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

  res.send(books);
});

// for searching authors
search.get("/authors", async (req, res) => {
  const { search, pageNum, pageSize } = req.query;

  const regex = new RegExp(search, "i");
  const author = await Author.find({ name: { $regex: regex } })
    .sort({ name: 1 })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

  res.send(author);
});

module.exports = search;

/*
Understanding Skip and Limit
Imagine you have a bookshelf with 100 books.

Limit
Limit is like saying, "I only want to take 10 books from the shelf."
It tells MongoDB to return only a specific number of documents from the result set.
Skip
Skip is like saying, "Skip the first 20 books on the shelf."
It tells MongoDB to ignore a certain number of documents before starting to return results.
Combining Skip and Limit

If you want the second set of 10 books, you would:
Skip the first 10 books (skip: 10)
Take the next 10 books (limit: 10)
*/
