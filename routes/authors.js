const express = require("express");
const authors = express.Router();
const { Author, validate } = require("../models/author");
const checkId = require("../middleware/checkId");

authors.get("/", async (req, res) => {
  const authors = await Author.find().sort("name");
  res.send(authors);
});

// get a author
authors.get("/:id", checkId, async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author)
    return res.status(404).send("The author with the given ID was not found!");

  res.send(author);
});

// create a author
authors.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const author = new Author({
    name: req.body.name,
    nationality: req.body.nationality,
    bio: req.body.bio,
    image: req.body.image,
  });

  await author.save();
  res.send(author);
});

// update a author
authors.put("/:id", checkId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      nationality: req.body.nationality,
      bio: req.body.bio,
      image: req.body.name,
    },
    { new: true }
  );

  if (!author)
    return res.status(404).send("The author with the given ID was not found!");

  res.send(author);
});

// delete a author
authors.delete("/:id", checkId, async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);

  if (!author)
    return res.status(404).send("The author with the given ID was not found!");

  res.send("Deleted Successfully");
});

module.exports = authors;
