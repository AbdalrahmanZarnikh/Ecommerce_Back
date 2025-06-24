const express = require("express");

const router = express.Router();
const { Allowed, Protect } = require("../controllers/authController");

const {
  getUserValidator,
  createUserValidator,
  updateUserFromAdmin,
  updateUserProfileValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../controllers/userController");

//for admin
router.get("/", Protect, Allowed("admin"),getUsers);

router.get("/:id", Protect, Allowed("admin"),getUserValidator, getUser);

router.post("/", Protect, Allowed("admin"),createUserValidator,createUser);

router.put("/:id", Protect, Allowed("admin"),updateUserFromAdmin, updateUser);

router.delete("/:id", Protect, Allowed("admin"),deleteUserValidator, deleteUser);

//for users
router.get("/get-me", getLoggedUserData);

router.put(
  "/update-mypassword",
  Protect,
  Allowed("user", "admin"),
  updateUserProfileValidator,
  updateLoggedUserPassword
);

router.put(
  "/update-me",
  Protect,
  Allowed("user", "admin"),
  updateLoggedUserData
);

router.delete(
  "/delete-me",
  Protect,
  Allowed("user", "admin"),
  deleteLoggedUserData
);
module.exports = router;
