const mongoose = require("mongoose");
const logger = require("../startup/logging");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/libly")
    .then(() => logger.info("Successfully connected to MongoDB"));
};
