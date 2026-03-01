const {
  PORT = 3001,
  JWT_SECRET = "super-strong-secret",
  RATE_LIMIT_WINDOW_MS = 90000, // 15 minutes - dev env
  RATE_LIMIT_MAX_REQUESTS = 100, // max 100 requests per window - dev env
  RATE_LIMIT_MESSAGE = "Too many requests from this IP, please try again later.",
  RATE_LIMIT_STATUS_CODE = 429,
} = process.env;

module.exports = {
  PORT: parseInt(PORT, 10),
  JWT_SECRET,
  RATE_LIMIT_WINDOW_MS: parseInt(RATE_LIMIT_WINDOW_MS, 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(RATE_LIMIT_MAX_REQUESTS, 10),
  RATE_LIMIT_MESSAGE,
  RATE_LIMIT_STATUS_CODE: parseInt(RATE_LIMIT_STATUS_CODE, 10),
};
