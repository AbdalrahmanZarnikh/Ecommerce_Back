const express = require("express");

const router = express.Router();

const { Allowed, Protect } = require("../controllers/authController");


const {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator
} = require("../utils/validators/reviewValidator")

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
  .post(Protect, Allowed("user", "admin"), 
  createReviewValidator,createReview);

router
  .route("/:id")
  .get(getReviewValidator,getReview)
  .put(Protect, Allowed("user", "admin"),updateReviewValidator ,updateReview)
  .delete(Protect, Allowed("admin","user"), deleteReviewValidator,deleteReview);
  
module.exports = router;
