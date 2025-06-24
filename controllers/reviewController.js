const reviewModel = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const ProductModel = require("../models/productModel");

const getReviews = asyncHandler(async (req, res, next) => {
  const countDocuments = await reviewModel.countDocuments();

  const features = new ApiFeatures(reviewModel.find({}), req.query);

  features
    .Paginate(countDocuments)
    .Filter()
    .Search("review")
    .LimitFields()
    .Sort();

  const { mongooseQuery, pagination } = features;
  const reviews = await mongooseQuery;
  if (!reviews) {
    return next(new ApiError("reviews Not Found !!", 404));
  }
  res.status(200).json({ status: "Success", pagination, data: reviews });
});

const getReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await reviewModel.findById(id);
  if (!review) {
    return next(new ApiError("review Not found", 404));
  }
  res.status(200).json({ status: "Success", data: review });
});

const createReview = asyncHandler(async (req, res, next) => {
  const { title, ratings, product } = req.body;

  const review = await reviewModel.create({
    title,
    ratings,
    product,
    user: req.user._id,
  });

  
  await ProductModel.findByIdAndUpdate(product, {
    $addToSet: { reviews: review._id },
  },{new:true});
  

  res.status(201).json({ message: "Success", data: review });
});

const updateReview = asyncHandler(async (req, res, next) => {
  const review = await reviewModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!review) {
    return next(new ApiError("review Not found !!", 404));
  }
  res.status(200).json({ status: "Success", data: review });
});

const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await reviewModel.findByIdAndDelete(req.params.id);
  if (!review) {
    res.status(404).json({ status: "Fail", message: "review Not Found" });
  }
  res
    .status(200)
    .json({ status: "Success", message: "review deleted successfully" });
});

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
