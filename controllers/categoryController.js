const CategoryModel = require("../models/categoryModel");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures=require("../utils/ApiFeatures");

const {RemoveImageCloudinary,RemoveMultipleImagesCloudinary} =require("../utils/Cloudinary")

exports.GetAllCategories = asyncHandler(async (req, res, next) => {

  const countDocuments=CategoryModel.countDocuments();

  const features=new ApiFeatures(CategoryModel.find({}),req.query)

  features.Paginate(countDocuments).Filter().Search("CategoryModel").LimitFields().Sort()

  const {mongooseQuery,pagination}=features

  const categories=await mongooseQuery;

  if (!categories) {
    return next(new ApiError("Categories Not Found !!", 404));
  }

  res.status(200).json({ status: "Success",pagination, data: categories });
});



exports.GetOneCategory=asyncHandler(async (req,res,next)=>{
  const {id}=req.params;

  const category=await CategoryModel.findById(id);

  if(!category){
    return res.status(404).json({status:"Fail",message:"Category Not Found"})
  }

  res.status(200).json({status:"Success",data:category})
})


exports.CreateCategory=asyncHandler(async(req,res,next)=>{
  if(req.image){
    req.body.image=req.image;
  }
  const category=await CategoryModel.create(req.body);
  res.status(201).json({status:"Success",data:category});
})


exports.UpdateCategory=asyncHandler(async(req,res,next)=>{

  const {id}=req.params;

  if(req.file){
    await RemoveImageCloudinary(CategoryModel,id);
    req.body.image=req.image;
  }
  else if(req.files){
    await RemoveMultipleImagesCloudinary(CategoryModel,id);
    req.body.images=req.images;
  }

  const categoryUpdated=await CategoryModel.findByIdAndUpdate(id,req.body,{new:true});

  if(!categoryUpdated){
    return res.status(404).json({status:"Fail",message:"Category Not Found"})
  }
    res.status(200).json({ status: "Success", data: categoryUpdated });

})

exports.DeleteCategory=asyncHandler(async (req,res)=>{
  const {id} =req.params
  const findDocument=await CategoryModel.findById(id)

  if(findDocument.image){
    await RemoveImageCloudinary(CategoryModel,id)
  }

  else if(findDocument.images){
    await RemoveMultipleImagesCloudinary(CategoryModel,id);
  }

  const document=await CategoryModel.findByIdAndDelete(id);

     if (!document) {
      return res
        .status(404)
        .json({ status: "Fail", message: "Document not found" });
    }
    res
      .status(200)
      .json({ status: "Success", message: "Document deleted successfully" });
})