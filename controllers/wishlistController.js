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

  const wishlistWithProducts = await Promise.all(
    user.wishlist.map(async (id) => {
      const product = await ProductModel.findById(id);
      return product ? id : null;
    })
  );

  const CorrectWishlist = wishlistWithProducts.filter((id) => id !== null);

  res.status(200).json({
    status: "Success",
    message: "Product Added Successfully To Wishlist ",
    data: CorrectWishlist,
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

  const wishlistWithProducts = await Promise.all(
    user.wishlist.map(async (id) => {
      const product = await ProductModel.findById(id);
      return product ? id : null;
    })
  );

  const CorrectWishlist = wishlistWithProducts.filter((id) => id !== null);

  res.status(200).json({
    status: "success",
    message: "Product Romoved Successfully From Wishlist",
    data: user.wishlist,
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
