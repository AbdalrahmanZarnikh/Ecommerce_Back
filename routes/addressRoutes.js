const express = require("express");

const router = express.Router();

const { Allowed, Protect } = require("../controllers/authController");

const {
AddAddress,
RemoveAddress,
GetLoggedUserAddresses
} = require("../controllers/addressController");

router.delete("/:addressId", Protect, RemoveAddress);

router
  .route("/")
  .get(Protect, GetLoggedUserAddresses)
  .post(Protect, AddAddress);

module.exports = router;
