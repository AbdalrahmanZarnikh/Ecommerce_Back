const asyncHandler = require("express-async-handler");


const UserModel = require("../models/userModel");

exports.AddProductToWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOneAndUpdate(req.user._id, {
    $addToSet:{wishlist:req.body.productId}
  },{new:true});

  res.status(200).json({
    status:"Success",
    message:"Product Added Successfully To Wishlist ",
    data:user.wishlist
  })
});


exports.RemoveProductFromWishlist=asyncHandler(async (req,res,next)=>{

    const user=await UserModel.findOneAndUpdate(req.user._id,{
        $pull:{wishlist:req.params.productId}
    },{new:true})

    
  res.status(200).json({
    status: "success",
    message: "Product Romoved Successfully From Wishlist",
    data: user.wishlist,
  });


})


exports.GetLoggedUserWishlist=asyncHandler(async (req,res,next)=>{
    const user= await UserModel.findById(req.user._id).populate("wishlist");

    res.status(200).json({
        status:"Success",
        result:user.wishlist.length,
        data:user.wishlist
    })
})