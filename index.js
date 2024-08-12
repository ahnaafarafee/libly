const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
require("dotenv").config();


const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const app = express();
app.use(express.json());

const error = require("./middleware/error");

const books = require("./routes/books");
const genres = require("./routes/genres");
const authors = require("./routes/authors");
const users = require("./routes/users");
const auth = require("./routes/auth");
const search = require("./routes/search");
const orders = require("./routes/orders");

app.get("/", (req, res) => {
  res.send("Welcome to the homepage of Libly api!");
});

app.use("/api/books", books);
app.use("/api/genres", genres);
app.use("/api/authors", authors);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/search", search);
app.use("/api/orders", orders);

app.use(error);

mongoose
  .connect("mongodb://localhost/libly")
  .then(() => console.log("Successfully connected to MongoDB"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
