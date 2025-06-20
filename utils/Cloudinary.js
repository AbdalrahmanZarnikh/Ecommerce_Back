const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.UploadImageCloudinary = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path);

    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.RemoveImageCloudinary = async (Model, id) => {
  try {
    const doc = await Model.findById(id);
    if (doc.image.public_id) {
      const result = await cloudinary.uploader.destroy(doc.image.public_id);
      return result;
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

exports.RemoveMultipleImagesCloudinary = async (Model, id) => {
  try {
    const doc = await Model.findById(id);
    if (doc.images) {
      doc.images.forEach(async (image) => {
        const result = await cloudinary.uploader.destroy(image.public_id);
        return result;
      });
    }
  } catch (error) {
    console.log(error)
  }
};
