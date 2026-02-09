const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  errorMessages,
  INTERNAL_SERVER_ERROR_CODE,
  CREATED_CODE,
  DUPLICATE_KEY_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  OK_CODE,
  NOT_FOUND_ERROR_CODE,
} = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "Email and password are required" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect password or email") {
        return res
          .status(UNAUTHORIZED_ERROR_CODE)
          .send({ message: errorMessages.UNAUTHORIZED });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};
const createUser = (req, res) => {
  if (!req.body.password) {
    const error = new Error(errorMessages.BAD_REQUEST);
    error.code = BAD_REQUEST_ERROR_CODE;
    throw error;
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        avatar: req.body.avatar,
      })
    )
    .then((user) => {
      res.status(CREATED_CODE).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      console.error(err);
      if (
        err.name === "ValidationError" ||
        err.code === BAD_REQUEST_ERROR_CODE
      ) {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: errorMessages.BAD_REQUEST });
      }
      if (err.code === DUPLICATE_KEY_ERROR_CODE) {
        return res
          .status(CONFLICT_ERROR_CODE)
          .send({ message: errorMessages.CONFLICT });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};

const getCurrentUser = (req, res) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(OK_CODE).send({ data: user }))
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

const updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(OK_CODE).send({ data: user }))
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
module.exports = { updateUserProfile, getCurrentUser, createUser, login };
