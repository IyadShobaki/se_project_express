const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  CREATED_CODE,
  DUPLICATE_KEY_ERROR_CODE,
  OK_CODE,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Email and password are required"));
    return;
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      if (err.message === "Incorrect password or email") {
        next(new UnauthorizedError());
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  if (!req.body.password) {
    next(new BadRequestError());
    return;
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
      if (err.name === "ValidationError") {
        next(new BadRequestError());
      } else if (err.code === DUPLICATE_KEY_ERROR_CODE) {
        next(new ConflictError());
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(OK_CODE).send({ data: user }))
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

const updateUserProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(OK_CODE).send({ data: user }))
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
module.exports = { updateUserProfile, getCurrentUser, createUser, login };
