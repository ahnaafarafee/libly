const mongoose = require("mongoose");
const Joi = require("joi");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  nationality: { type: String, minLength: 3, maxLength: 50 },
  image: { type: String, default: "https://picsum.photos/200" },
  bio: {
    type: String,
    minLength: 3,
    maxLength: 150,
    default: "This author has no bio",
  },
});

authorSchema.index({ name: 'text' }); // Create a text index

const Author = mongoose.model("Author", authorSchema);

// validation logic using Joi
const validateAuthor = (author) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    nationality: Joi.string().min(3).max(50),
    bio: Joi.string().min(3).max(50),
    image: Joi.string(),
  });
  return schema.validate(author);
};

exports.authorSchema = authorSchema;
exports.Author = Author;
exports.validate = validateAuthor;
