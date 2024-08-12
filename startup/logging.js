require("express-async-errors");

const winston = require("winston");
require("winston-mongodb");
const { combine, timestamp, printf } = winston.format;

// winston logger
const logger = winston.createLogger({
  level: "info",
  format: combine(
    winston.format.errors({ stack: true }), // log the full stack
    timestamp(), // get the time stamp part of the full log message
    printf(({ level, message, timestamp, stack }) => {
      // formatting the log outcome to show/store
      return `${timestamp} ${level}: ${message} - ${stack}`;
    }),
    winston.format.metadata() // >>>> ADD THIS LINE TO STORE the ERR OBJECT IN META field
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      // log full stack error on the file
      filename: "logfile.log",
      format: winston.format.combine(
        winston.format.colorize({
          all: false,
        })
      ),
    }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/libly",
      options: { useUnifiedTopology: true },
    }),
  ],
});

module.exports = logger;
