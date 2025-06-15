const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const { UploadImageCloudinary } = require("cloudinary");

const UploadMultipleImages = asyncHandler(async (req, res, next) => {
  req.body.images = [];
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (Image, index) => {
        const fileName = `image-${Date.now()}-${index}.jpeg`;

        await sharp(image.buffer)
          .resize(400, 400)
          .toFormat("jpeg")
          .jpeg({ quality: 100 })
          .toFile("uploads/product");

        const result = await UploadImageCloudinary(
          `./uploads/product/${fileName}`
        );

        req.body.images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      })
    );
  }
  next();
});

module.exports = UploadMultipleImages;
