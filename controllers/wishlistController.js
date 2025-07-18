const asyncHandler = require("express-async-handler");

const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");

exports.AddProductToWishlist = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findById(req.body.productId);
  if (!product) {
    return next(new Error("product not found"));
  }
   
  const user = await UserModel.findOneAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    message: "Product Added Successfully To Wishlist ",
    data: user.wishlist,
  });
});

exports.RemoveProductFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOneAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.params.productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Product Romoved Successfully From Wishlist",
    data: user.wishlist,
  });
});

exports.GetLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate("wishlist");

  const validWishlist = user.wishlist.filter(product => product !== null);

  const cleanedWishlistIds = validWishlist.map(product => product._id);

  if (cleanedWishlistIds.length !== user.wishlist.length) {
    user.wishlist = cleanedWishlistIds;
    await user.save();
  }

  res.status(200).json({
    status: "Success",
    result: validWishlist.length,
    data: validWishlist,
  });
});

