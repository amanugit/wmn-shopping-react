import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const updateMe = asyncHandler(async (req, res, next) => {
  const me = await User.findById(req.user._id);
  if (me) {
    (me.name = req.body.name || me.name),
      (me.email = req.body.email || me.email);
    const updated = await me.save();
    const token = Jwt.sign({ id: me._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    res.status(200).json({
      status: "success",
      id: me._id,
      name: me.name,
      email: me.email,
      token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: "success",
    data: null,
  });
});

const deleteOne = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("No user found with that id");
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const updateOne = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    res.status(404);
    throw new Error("There is no user with this id");
  }
  res.status(200).json({
    status: "success",
    user,
  });
});

const createOne = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    user,
  });
});

const getOne = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("There is no user with this id");
  }
  res.status(200).json({
    status: "success",
    user,
  });
});

const getAll = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    status: "success",
    results: (await users).length,
    users,
  });
});

export { getAll, getOne, deleteMe, deleteOne, createOne, updateOne };
