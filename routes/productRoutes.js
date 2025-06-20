const express = require("express");

const router = express.Router();
const { Allowed, Protect } = require("../controllers/authController");
const {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetAllProducts,
  GetOneProduct,
} = require("../controllers/productController");



const {upload} =require("../utils/MulterConfig")

const UploadImage = require("../middlewares/UploadImageMiddleware");

const UploadMultipleImages = require("../middlewares/UploadMultipleImagesMiddleware");

router
  .route("/")
  .get(GetAllProducts)
  .post(
    Protect,
    Allowed("admin"),
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
      {
        name: "images",
        maxCount: 10,
      },
    ]),
    UploadImage,
    UploadMultipleImages,
    CreateProduct
  );

router
  .route("/:id")
  .put(
    Protect,
    Allowed("admin"),
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
      {
        name: "images",
        maxCount: 10,
      },
    ]),
    UploadImage,
    UploadMultipleImages,
    UpdateProduct
  )
  .get(GetOneProduct)
  .delete(Protect, Allowed("admin"), DeleteProduct);

module.exports = router;
