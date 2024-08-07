const express = require("express");
const mongoose = require("mongoose");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const app = express();
app.use(express.json());

const books = require("./routes/books");
const genres = require("./routes/genres");
const authors = require("./routes/authors");

app.get("/", (req, res) => {
  res.send("Welcome to the homepage of Libly api!");
});

app.use("/api/books", books);
app.use("/api/genres", genres);
app.use("/api/authors", authors);

mongoose
  .connect("mongodb://localhost/libly")
  .then(() => console.log("Successfully connected to MongoDB"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
