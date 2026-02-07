const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  login,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/:userId", getUserById);

router.post("/", createUser);

router.post("/signin", login);
router.post("/signup", createUser);
module.exports = router;
