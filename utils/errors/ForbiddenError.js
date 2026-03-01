const { FORBIDDEN_ERROR_CODE, errorMessages } = require("../errors");

class ForbiddenError extends Error {
  constructor(message = errorMessages.FORBIDDEN) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE;
    this.name = "ForbiddenError";
  }
}

module.exports = ForbiddenError;
