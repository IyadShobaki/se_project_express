const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { NOT_FOUND_ERROR_CODE, errorMessages } = require("../utils/errors");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: errorMessages.NOT_FOUND });
});
module.exports = router;
