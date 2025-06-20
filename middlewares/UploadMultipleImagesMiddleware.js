const asyncHandler = require("express-async-handler");

const { UploadImageCloudinary } = require("../utils/Cloudinary");

const UploadMultipleImages = asyncHandler(async (req, res, next) => {
  if(req.files){
     req.body.images = [];
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (Image) => {

        const result = await UploadImageCloudinary(Image.path);

        req.body.images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      })
    );
  }
}
next();

});

module.exports = UploadMultipleImages;
