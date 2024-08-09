const Joi = require("joi");
const express = require("express");
const _ = require("lodash");
const auth = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");

auth.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  //   see if the user's email already registered or no
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = user.generateAuthToken();
  res.send(token);
});

// validation logic using Joi
const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: passwordComplexity(),
  });
  return schema.validate(req);
};

module.exports = auth;
