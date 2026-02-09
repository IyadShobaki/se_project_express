const BAD_REQUEST_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;
const FORBIDDEN_CODE = 403;

const errorMessages = {
  // BAD_REQUEST_ERROR_CODE (400)
  BAD_REQUEST: "Invalid data passed with the request.",

  // NOT_FOUND_ERROR_CODE (404)
  NOT_FOUND:
    "There is no user or clothing item with the requested id or the request was sent to invalid address.",

  // INTERNAL_SERVER_ERROR_CODE (500)
  INTERNAL_SERVER_ERROR: "An error has occurred on the server.",

  // FORBIDDEN
  FORBIDDEN: "You don't have permission to delete this item.",
};

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  FORBIDDEN_CODE,
  errorMessages,
};
