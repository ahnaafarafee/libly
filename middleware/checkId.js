module.exports = function (req, res, next) {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Invalid ID format!");
  }
  next();
};
