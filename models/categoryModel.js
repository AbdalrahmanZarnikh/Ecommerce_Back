const mongoose=require("mongoose");

const bcrypt= require("bcryptjs")


const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"category  required"],
        unique:[true,"Category Must Be Unique"],
        minlength:[3,"Too Short Category Name"],
        maxlength:[32,"Too Long Category Name"]
    },
    slug:{
      type:String,
      lowercase:true
    },
    image:{
        type:String
    }
    
   
    

},{timestamps:true})





const CategoryModel=mongoose.model("Category",categorySchema);


module.exports=CategoryModel;