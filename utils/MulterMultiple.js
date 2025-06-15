const multer=require("multer");
const ApiError=require("./ApiError")

const storage=multer.memoryStorage();


const fileFilter=(req,res,cb)=>{
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }
    else{
        cb(new ApiError("only image allowed",400),false);
    }
}


exports.uploadMutliple=multer({storage,fileFilter})


