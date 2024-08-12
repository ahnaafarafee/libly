module.exports = function (error, req, res, next) {
  // log
  res.status(500).send("Something went wrong");
};
