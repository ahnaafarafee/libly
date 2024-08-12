const express = require("express");
const app = express();
app.use(express.json());
require("./startup/routes")(app);
require("dotenv").config();
require("./startup/db")();
const logger = require("./startup/logging");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port: ${port}`));
