const express = require("express");

const router = express.Router();

const { Allowed, Protect } = require("../controllers/authController");

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
router
  .route("/")
  .get(getReviews)
  .post(Protect, Allowed("user", "admin"), createReview);

router
  .route("/:id")
  .get(getReview)
  .put(Protect, Allowed("user", "admin"), updateReview)
  .delete(Protect, Allowed("admin"), deleteReview);
  
module.exports = router;
