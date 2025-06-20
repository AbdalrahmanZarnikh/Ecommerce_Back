const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

const ApiError= require("../utils/ApiError")

//get users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: users });
});
//get user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
    if(!user){
    return next(new ApiError("User Not Found!!!",404))
  }
  res.status(200).json({ status: "success", data: user });
});
//create new user
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  // if (!name  || !email || !password || !role) {
  //   return res
  //     .status(400)
  //     .json({ status: "fail", message: "all fields are required" });
  // }
  const user = await User.create({
    name,
    email,
    password,
    role
  });
  res.status(201).json({ status: "success", data: user });
});
//update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
    if(!user){
    return next(new ApiError("User Not Found!!!",404))
  }
  res.status(200).json({ status: "success", data: user });
});
//delete user
const deleteUser = asyncHandler(async (req, res,next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if(!user){
    return next(new ApiError("User Not Found!!!",404))
  }
  res.status(200).json({ status: "success",message:"User Deleted Successfully"});
});
// get logged user data
const getLoggedUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ status: "success", data: user });
});
//update logged user password
const updateLoggedUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body.password, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ status: "success", data: user });
});
//update logged user data (without password and role)
const updateLoggedUserData = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ status: "success", data: user });
});
//delete logged user data
const deleteLoggedUserData = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);
  res.status(200).json({ status: "success", data: user });
});
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
};
