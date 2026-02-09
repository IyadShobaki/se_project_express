const ClothingItem = require("../models/clothingItem");
const {
  INTERNAL_SERVER_ERROR_CODE,
  errorMessages,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  OK_CODE,
  CREATED_CODE,
  FORBIDDEN_ERROR_CODE,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK_CODE).send({ data: items }))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};

const createClothingItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED_CODE).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: errorMessages.BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new Error(errorMessages.UNAUTHORIZED);
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(OK_CODE).send({ message: "Item deleted successfully!" })
        );
    })
    .catch((err) => {
      console.error(err);
      if (err.message === errorMessages.UNAUTHORIZED) {
        return res
          .status(FORBIDDEN_ERROR_CODE)
          .send({ message: errorMessages.FORBIDDEN });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: errorMessages.NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: errorMessages.BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};

const likeClothingItem = (req, res) => {
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
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: errorMessages.NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: errorMessages.BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};

const dislikeClothingItem = (req, res) => {
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
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: errorMessages.NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: errorMessages.BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};
module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
