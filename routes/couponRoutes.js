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

router.route("/").get(Protect, Allowed("admin"), getCoupons)
.post(Protect, Allowed("admin"), createCoupon);

router.route("/:id").get(Protect, Allowed("admin"), getCoupon)
.put(Protect, Allowed("admin"), updateCoupon).delete(Protect, Allowed("admin"), deleteCoupon);

module.exports = router
