const router = require("express").Router();
const {
  register,
  getUsers,
  getUserById,
  createUser,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/:userId", getUserById);

router.post("/", createUser);

//app.post('/signin', login);
router.post("/signup", register);
module.exports = router;
