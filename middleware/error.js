const logger = require("../startup/logging");

module.exports = function (error, req, res, next) {
  // log
  logger.error(error);

  res.status(500).send("Something went wrong");
};
