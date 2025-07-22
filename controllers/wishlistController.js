const asyncHandler = require("express-async-handler");

const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");

exports.AddProductToWishlist = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findById(req.body.productId);
  if (!product) {
    return next(new Error("Product not found"));
  }

  const user = await UserModel.findOneAndUpdate(
    { _id: req.user._id },
    { $addToSet: { wishlist: req.body.productId } },
    { new: true }
  );

  if (!user) {
    return next(new Error("User not found"));
  }

  const validProductIds = await Promise.all(
    user.wishlist.map(async (id) => {
      const product = await ProductModel.findById(id);
      return product ? id : null;
    })
  );

  console.log("hello ");

  user.wishlist = validProductIds.filter((id) => id !== null);
  await user.save();

  const populatedUser = await UserModel.findById(user._id).populate("wishlist");

  res.status(200).json({
    status: "Success",
    message: "Product added successfully to wishlist",
    data: populatedUser.wishlist
  });
});

exports.RemoveProductFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { wishlist: req.params.productId } },
    { new: true }
  );

  if (!user) {
    return next(new Error("User not found"));
  }

  const validProductIds = await Promise.all(
    user.wishlist.map(async (id) => {
      const product = await ProductModel.findById(id);
      return product ? id : null;
    })
  );

  user.wishlist = validProductIds.filter((id) => id !== null);
  await user.save();

  const populatedUser = await UserModel.findById(user._id).populate("wishlist");

  res.status(200).json({
    status: "success",
    message: "Product removed successfully from wishlist",
    data: populatedUser.wishlist
  });
});


exports.GetLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate("wishlist");

  res.status(200).json({
    status: "Success",
    result: user.wishlist.length,
    data: user.wishlist,
  });
});
