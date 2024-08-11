const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin, name: this.name },
    process.env.JWT_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// validation logic using Joi
const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: passwordComplexity(),
    isAdmin: Joi.boolean().required(),
  });
  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
