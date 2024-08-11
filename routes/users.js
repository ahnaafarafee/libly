const express = require("express");
const _ = require("lodash");
const users = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

// create a user
users.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  //   see if the user's email already registered or no
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("A user is already registered with this email");

  user = new User(_.pick(req.body, ["password", "name", "email", "isAdmin"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token) // headers are just metadata.
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

// get to my user account
users.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select({
    name: 1,
    email: 1,
    orders: 1,
  }); //exclude the password and isAdmin while sending
  res.send(user);
});

// get to my user account
users.put("/me", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name, //only name can be updated
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found!");

  res.send(_.pick(user, ["_id", "name", "email"]));
});

users.delete("/me", auth, async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.send("Your Account Deleted Successfully!");
});

module.exports = users;
