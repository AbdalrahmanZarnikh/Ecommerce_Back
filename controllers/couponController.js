const couponModel = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

const getCoupons = asyncHandler(async(req, res, next) => {
      const countDocuments =await  couponModel.countDocuments();
    
      const features = new ApiFeatures(couponModel.find({}), req.query);
    
      features
        .Paginate(countDocuments)
        .Filter()
        .Search("brand")
        .LimitFields()
        .Sort();
    
      const { mongooseQuery, pagination } = features;
    const coupons = await mongooseQuery
      if (!coupons) {
        return next(new ApiError("coupons Not Found !!", 404));
      }
      res.status(200).json({ status: "Success", pagination, data: coupons });
});


const getCoupon = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const coupon = await couponModel.findById(id);
    if(!coupon){
        return next (new ApiError("coupon Not dound" ,404))
    }
    res.status(200).json({status: "success" , data: coupon});
});
const createCoupon = asyncHandler(async(req , res, next)=>{
    const coupon = await couponModel.create(req.body);
    res.status(201).json({status: "success" , data: coupon});
});


const updateCoupon = asyncHandler(async (req,res,next) => {
    const coupon = await couponModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if(!coupon){
    return next(new ApiError("coupon Not found !!" ,404));
  }
    res.status(200).json({status: "success" , data: coupon});
});


const deleteCoupon = asyncHandler(async(req,res,next) => {
    const coupon = await couponModel.findByIdAndDelete(req.params.id);
  if (!coupon) {
    res.status(404).json({ status: "Fail", message: "coupon Not Found" });
  }
  res.status(200).json({ status: "Success", message: "coupon deleted successfully" });
})
module.exports = {getCoupons , getCoupon ,createCoupon ,updateCoupon ,deleteCoupon};