const ClothingItem = require("../models/clothingItem");
const {
  OK_CODE,
  CREATED_CODE,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(OK_CODE).send({ data: items }))
    .catch(next);
};

const createClothingItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED_CODE).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(OK_CODE).send({ message: "Item deleted successfully!" })
        );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError());
      } else if (err.name === "CastError") {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

const likeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_CODE).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError());
      } else if (err.name === "CastError") {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

const dislikeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_CODE).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError());
      } else if (err.name === "CastError") {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};
module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
