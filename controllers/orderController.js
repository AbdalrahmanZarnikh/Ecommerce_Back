const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

const { RemoveImageCloudinary } = require("../utils/Cloudinary");
const ProductModel = require("../models/productModel");

exports.CreateCashOrder = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;

  const cart = await CartModel.findById(req.params.cartId);

  if (!cart) {
    return next(new ApiError("there is no such cart with id ", 404));
  }

  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice;

  const order = await OrderModel.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: {
      phone: req.body.phone,
      city: req.body.city,
      details: req.body.details,
    },
    totalOrderPrice,
  });

  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));

    await ProductModel.bulkWrite(bulkOption, {});

    await CartModel.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({ status: "success", data: order });
});

exports.FindAllOrders = asyncHandler(async (req, res, next) => {
  const countDocuments = await OrderModel.countDocuments();

  const features = new ApiFeatures(OrderModel.find(req.filterObj), req.query);

  features
    .Paginate(countDocuments)
    .Filter()
    .Search("orderModel")
    .LimitFields()
    .Sort();

  const { mongooseQuery, pagination } = features;

  const orders = await mongooseQuery;

  if (!orders) {
    return next(new ApiError("There is no orders !!"));
  }

  res.status(200).json({ status: "success", pagination, data: orders });
});

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") {
    req.filterObj = { user: req.user._id };
  }
  console.log(req.filterObj);
  next();
});

exports.FindSpecificOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.orderId);

  if (!order) {
    return next(new ApiError("Order Not Found !!"));
  }

  res.status(200).json({ status: "success", data: order });
});

exports.UpdateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.orderId);
  if (!order) {
    return next(new ApiError("there is no such a order with this id ", 404));
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
});

exports.CreateHawalaOrder = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findById(req.params.cartId);

  if (!cart) {
    return next(new ApiError("there is no such cart with id ", 404));
  }

  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice;

  const order = await OrderModel.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: {
      phone: req.body.phone,
      details: req.body.details,
      city: req.body.city,
    },
    totalOrderPrice,
    paymentMethod: "hawala",
    hawalaCompany: req.body.hawalaCompany,
    hawalaCode: req.image,
  });

  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));

    await ProductModel.bulkWrite(bulkOption, {});

    await CartModel.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({ status: "success", data: order });
});
