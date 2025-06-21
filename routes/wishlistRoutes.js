const express = require("express");

const router = express.Router();

const { Allowed, Protect } = require("../controllers/authController");

const {
  AddProductToWishlist,
  RemoveProductFromWishlist,
  GetLoggedUserWishlist,
} = require("../controllers/wishlistController");

router.delete("/:productId", Protect, RemoveProductFromWishlist);

router
  .route("/")
  .get(Protect, GetLoggedUserWishlist)
  .post(Protect, AddProductToWishlist);

module.exports = router;
