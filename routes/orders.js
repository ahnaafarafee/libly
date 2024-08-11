const mongoose = require("mongoose");
const express = require("express");
const orders = express.Router();
const { Order, validate } = require("../models/order");
const { User } = require("../models/user");
const { Book } = require("../models/book");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const checkId = require("../middleware/checkId");

// get all orders
// only admin can see all the orders made by any user
//there maybe thousands of orders, so it's a good idea to paginate this
orders.get("/", [auth, admin], async (req, res) => {
  const { pageNum, pageSize } = req.query;

  const orders = await Order.find()
    .sort("-dateOrdered")
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

  res.send(orders);
});

// admin get a order [of any users]
orders.get("/:id", [auth, admin, checkId], async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send("The order with the given ID was not found!");

  res.send(order);
});

// create a order
orders.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid book");

  if (book.numberInStock === 0)
    return res.status(400).send("This book is not in stock!");

  let user = req.user;

  let order = new Order({
    user: {
      _id: user._id,
      name: user.name,
    },
    book: {
      _id: book._id,
      title: book.title,
    },
  });

  // await User.findByIdAndUpdate(user._id, {
  //   orders: order,
  // });

  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const result = await order.save();

      const updatedUser = await User.findById(user._id);
      updatedUser.orders.push(result._id);
      await updatedUser.save();

      book.numberInStock--;
      book.save();
      res.send(result);
    });

    session.endSession();
    console.log("success");
  } catch (error) {
    console.log("error", error.message);
  }
});

module.exports = orders;
