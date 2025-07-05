const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

const {
  RemoveImageCloudinary,
  RemoveMultipleImagesCloudinary,
} = require("../utils/Cloudinary");
const ProductModel = require("../models/productModel");

exports.GetAllProducts = asyncHandler(async (req, res, next) => {
  const countDocuments = await ProductModel.countDocuments();

  const features = new ApiFeatures(ProductModel.find({}), req.query);

  features
    .Filter()
    .Search("ProductModel")
    .Paginate(countDocuments)
    .LimitFields()
    .Sort();

  const { mongooseQuery, pagination } = features;

  const products = await mongooseQuery;

  if (!products) {
    return next(new ApiError("Products Not Found !!", 404));
  }

  res.status(200).json({ status: "Success", pagination, data: products });
});

exports.GetOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product) {
    return res
      .status(404)
      .json({ status: "Fail", message: "Product Not Found" });
  }

  res.status(200).json({ status: "Success", data: product });
});

exports.CreateProduct = asyncHandler(async (req, res) => {
  if (req.image) {
    req.body.image = req.image;
  }
  if (req.images) {
    req.body.images = req.images;
  }
  const product = await ProductModel.create(req.body);
  res.status(201).json({ status: "Success", data: product });
});

exports.UpdateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.files?.image) {
    await RemoveImageCloudinary(ProductModel, id);
    req.body.image = req.image;
  }

  if (req.files?.images) {
    await RemoveMultipleImagesCloudinary(ProductModel, id);
    req.body.images = req.images;
  }

  const productUpdated = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!productUpdated) {
    return res
      .status(404)
      .json({ status: "Fail", message: "Product Not Found" });
  }
  res.status(200).json({ status: "Success", data: productUpdated });
});

exports.DeleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const findDocument = await ProductModel.findById(id);

  if (findDocument.image) {
    await RemoveImageCloudinary(ProductModel, id);
  }

  if (findDocument.images) {
    await RemoveMultipleImagesCloudinary(ProductModel, id);
  }

  const document = await ProductModel.findByIdAndDelete(id);

  if (!document) {
    return res
      .status(404)
      .json({ status: "Fail", message: "Document not found" });
  }
  res
    .status(200)
    .json({ status: "Success", message: "Document deleted successfully" });
});
