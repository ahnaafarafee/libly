const mongoose = require("mongoose");
const Joi = require("joi");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    user: {
      type: new mongoose.Schema({
        name: { type: String, required: true, minLength: 3, maxLength: 50 },
      }),
      require: true,
    },
    book: {
      type: new mongoose.Schema({
        title: { type: String, required: true, minLength: 3, maxLength: 100 },
      }),
      require: true,
    },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      require: true,
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
  })
);

// validation logic using Joi
const validateOrder = (order) => {
  const schema = Joi.object({
    bookId: Joi.objectId().required(),
  });
  return schema.validate(order);
};

exports.Order = Order;
exports.validate = validateOrder;
