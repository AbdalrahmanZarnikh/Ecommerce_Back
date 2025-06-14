const CategoryModel = require("../models/categoryModel");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

exports.GetAllCategories = asyncHandler(async (req, res, next) => {
  const categories = CategoryModel.find({});
  if (!categories) {
    return next(new ApiError("Categories Not Found !!", 404));
  }

  res.status(200).json({ result: categories.length, data: categories });
});


