const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const limiter = require("../middlewares/rateLimiter");
const NotFoundError = require("../utils/errors/NotFoundError");
const {
  validateUserLogin,
  validateUserCreate,
} = require("../middlewares/validation");

router.post("/signin", limiter, validateUserLogin, login);
router.post("/signup", limiter, validateUserCreate, createUser);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res, next) => {
  next(new NotFoundError());
});
module.exports = router;
