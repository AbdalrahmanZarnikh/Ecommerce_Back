const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

const {
  RemoveImageCloudinary,
  RemoveMultipleImagesCloudinary,
} = require("../utils/Cloudinary");

const getAllBrands = asyncHandler(async (req, res, next) => {
  const countDocuments =await  Brand.countDocuments();

  const features = new ApiFeatures(Brand.find({}), req.query);

  features
    .Paginate(countDocuments)
    .Filter()
    .Search("brand")
    .LimitFields()
    .Sort();

  const { mongooseQuery, pagination } = features;

  const brands = await mongooseQuery;

  if (!brands) {
    return next(new ApiError("Brands Not Found !!", 404));
  }
  res.status(200).json({ status: "Success", pagination, data: brands });
});

const getBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ApiError("Brand Not Found !!", 404));
  }
  res.status(200).json({ status: "Success", data: brand });
});

const createBrand = asyncHandler(async (req, res, next) => {
  if (req.image) {
    req.body.image = req.image;
  }
  const brand = await Brand.create(req.body);
  res.status(200).json({ status: "Success", data: brand });
});

const updateBrand = asyncHandler(async (req, res, next) => {
  if (req.image) {
    await RemoveImageCloudinary(brand, req.params.id);
    req.body.image = req.image;
  }
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!brand) {
    res.status(404).json({ status: "Fail", message: "Brand Not Found" });
  }
  res.status(200).json({ status: "Success", data: brand });
});

const deleteBrand = asyncHandler(async (req, res, next) => {

  if (Brand.findById(req.params.id)) {
    await RemoveImageCloudinary(Brand, req.params.id);
  }

  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) {
    res.status(404).json({ status: "Fail", message: "Brand Not Found" });
  }
  res.status(200).json({ status: "Success", data: brand });
});
module.exports = {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
