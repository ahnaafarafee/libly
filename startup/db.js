const mongoose = require("mongoose");
const logger = require("../startup/logging");

module.exports = function () {
  mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => logger.info("Successfully connected to MongoDB"))
    .catch((err) => logger.error("Something Failed", err));
};
