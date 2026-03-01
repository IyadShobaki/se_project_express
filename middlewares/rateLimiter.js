const rateLimit = require("express-rate-limit");
const {
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_MESSAGE,
  RATE_LIMIT_STATUS_CODE,
} = require("../utils/config");

// Rate limiter middleware to protect against DoS attacks
const limiter = rateLimit({
  windowMS: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
  message: RATE_LIMIT_MESSAGE,
  statusCode: RATE_LIMIT_STATUS_CODE,
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

module.exports = limiter;
