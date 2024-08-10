const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");
const { authorSchema } = require("./author");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
    unique: true,
  },
  author: authorSchema,
  genre: genreSchema,
  numberInStock: { type: Number, required: true },
  image: {
    type: String,
    default: "https://picsum.photos/200",
  },
  isbn: { type: Number, required: true },
  description: {
    type: String,
    minLength: 3,
    maxLength: 500,
    default: "This book has no description",
  },
  published: { type: Date, default: Date.now() },
  price: { type: Number, required: true },
});

bookSchema.index({ title: "text" }); // Create a text index

const Book = mongoose.model("Book", bookSchema);

// validation logic using Joi
const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    genreId: Joi.objectId().required(),
    authorId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    image: Joi.string(),
    isbn: Joi.number().required(),
    description: Joi.string().min(3).max(100),
    published: Joi.date(),
    price: Joi.number().required(),
  });
  return schema.validate(book);
};

exports.Book = Book;
exports.validate = validateBook;
