const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");
const limiter = require("../middlewares/rateLimiter");
const { validateUserUpdate } = require("../middlewares/validation");

router.get("/me", limiter, auth, getCurrentUser);
router.patch("/me", limiter, auth, validateUserUpdate, updateUserProfile);

module.exports = router;
