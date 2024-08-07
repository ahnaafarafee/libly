const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 30 },
});

const Genre = mongoose.model("Genre", genreSchema);

// validation logic using Joi
const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(30),
  });
  return schema.validate(genre);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
