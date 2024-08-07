const express = require("express");
const genres = express.Router();
const { Genre, validate } = require("../models/genre");
const checkId = require("../middleware/checkId");

genres.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// get a genre
genres.get("/:id", checkId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found!");

  res.send(genre);
});

// create a genre
genres.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = new Genre({
    name: req.body.name,
  });

  await genre.save();
  res.send(genre);
});

// update a genre
genres.put("/:id", checkId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found!");

  res.send(genre);
});

// delete a genre
genres.delete("/:id", checkId, async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found!");

  res.send("Deleted Successfully");
});

module.exports = genres;
