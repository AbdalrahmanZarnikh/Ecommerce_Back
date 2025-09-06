const CartModel = require("../models/cartModel");
const UserModel = require("../models/userModel");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ProductModel = require("../models/productModel");
const CouponModel = require("../models/couponModel");


const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;

  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  cart.totalCartPrice = totalPrice;

  
  const couponDiscount = ((cart.totalCartPrice - cart.totalPriceAfterDiscount) / cart.totalCartPrice) * 100;


   const totalPriceAfterDiscount =
    totalPrice - (totalPrice * couponDiscount) / 100;

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;

};

exports.AddProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await ProductModel.findById(productId);
  if (!product) {
    return next(new Error("product not found"));
  }
  let cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) {
    cart = await CartModel.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product?._id.toString() == productId && item.color == color
    );
    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;
      cart.cartItems[productIndex] = cartItem;
    } else {
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }
  calcTotalCartPrice(cart);
  await cart.save();
  res.status(200).json({ status: "Success", data: cart });
});

exports.GetLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }

  res.status(200).json({
    status: "Success",
    numberOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.RemoveCartItem = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true }
  );

  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }

  calcTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "Success",
    numberOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.ClearCart = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOneAndDelete({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }

  res.status(204).send();
});

exports.UpdateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;

  const cart = await CartModel.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() == req.params.itemId
  );

  console.log(itemIndex);

  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];

    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(new ApiError("there is no item for this id ", 404));
  }

  calcTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "Success",
    numberOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.ApplyCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await CouponModel.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new ApiError("Coupon Is Invalid Or Expired"));
  }

  const cart = await CartModel.findOne({ user: req.user._id });

  const totalPrice = cart.totalCartPrice;

  const totalPriceAfterDiscount =
    totalPrice - (totalPrice * coupon.discount) / 100;

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;

  await cart.save();

  res.status(200).json({
    status: "Success",
    numberOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
