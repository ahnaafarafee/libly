const error = require("../middleware/error");
const books = require("../routes/books");
const genres = require("../routes/genres");
const authors = require("../routes/authors");
const users = require("../routes/users");
const auth = require("../routes/auth");
const search = require("../routes/search");
const orders = require("../routes/orders");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("Welcome to the homepage of Libly api!");
  });

  app.use("/api/books", books);
  app.use("/api/genres", genres);
  app.use("/api/authors", authors);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/search", search);
  app.use("/api/orders", orders);

  app.use(error);
};
