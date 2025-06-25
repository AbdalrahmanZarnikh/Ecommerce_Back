const asyncHandler = require("express-async-handler");


const UserModel = require("../models/userModel");

exports.AddAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOneAndUpdate(req.user._id, {
    $addToSet:{addresses:req.body}
  },{new:true});

  res.status(200).json({
    status:"Success",
    message:"Addresses Added Successfully",
    data:user.addresses
  })
});


exports.RemoveAddress=asyncHandler(async (req,res,next)=>{

    const user=await UserModel.findOneAndUpdate(req.user._id,{
        $pull:{addresses:{_id:req.params.addressId}}
    },{new:true})

    
  res.status(200).json({
    status: "success",
    message: "Address Romoved Successfully",
    data: user.addresses,
  });


})


exports.GetLoggedUserAddresses=asyncHandler(async (req,res,next)=>{
    const user= await UserModel.findById(req.user._id).populate("addresses");

    res.status(200).json({
        status:"Success",
        result:user.addresses.length,
        data:user.addresses
    })
})