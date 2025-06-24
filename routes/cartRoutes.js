const express = require("express");

const router = express.Router();

const { Allowed, Protect } = require("../controllers/authController");

const {
  AddProductToCart,
  RemoveCartItem,
  ApplyCoupon,
  GetLoggedUserCart,
  UpdateCartItemQuantity,
  ClearCart,
} = require("../controllers/cartController");




router.use(Protect)

router
  .route("/")
  .get(GetLoggedUserCart)
  .post(AddProductToCart)
  .delete(ClearCart);
  
  router.put("/apply-coupon", ApplyCoupon);
  
router.route("/:itemId").delete(RemoveCartItem).put(UpdateCartItemQuantity);


module.exports = router;
