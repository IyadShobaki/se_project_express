const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const limiter = require("../middlewares/rateLimiter");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

router.get("/", limiter, getClothingItems);

router.post("/", limiter, auth, validateClothingItem, createClothingItem);

router.delete("/:itemId", limiter, auth, validateId, deleteClothingItem);
router.put("/:itemId/likes", limiter, auth, validateId, likeClothingItem);
router.delete("/:itemId/likes", limiter, auth, validateId, dislikeClothingItem);

module.exports = router;
