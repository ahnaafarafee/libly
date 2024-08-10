const express = require("express");
const { Book } = require("../models/book");
const { Author } = require("../models/author");
const search = express.Router();

search.get("/", async (req, res) => {
  const { search, sortBy } = req.query;
  let sortOptions = {};
  if (sortBy === "desc") {
    sortOptions = { published: -1 };
  } else {
    sortOptions = { published: 1 };
  }
  const regex = new RegExp(search, "i");
  const books = await Book.find({ title: { $regex: regex } }).sort(sortOptions);
  const authors = await Author.find({ name: { $regex: regex } });

  const results = [...books, ...authors];

  res.send(results);
});

module.exports = search;
