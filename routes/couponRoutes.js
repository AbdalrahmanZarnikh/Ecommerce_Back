const express = require("express");

const router = express.Router();

const { Allowed, Protect } = require("../controllers/authController");

const {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

router.route("/").get(Protect, getCoupons)
.post(Protect, Allowed("admin"), createCoupon);

router.route("/:id").get(Protect, getCoupon)
.put(Protect, Allowed("admin"), updateCoupon).delete(Protect, Allowed("admin"), deleteCoupon);

module.exports = router
