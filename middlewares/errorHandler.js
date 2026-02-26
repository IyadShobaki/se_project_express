const { INTERNAL_SERVER_ERROR_CODE } = require("../utils/errors");

const errorHandler = (err, req, res) => {
  console.error(err);

  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR_CODE;
  const message = err.message || "An error has occurred on the server.";

  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
