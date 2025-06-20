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

const {createProductValidator,updateProductValidator,getProductValidator,deleteProductValidator}= require("../utils/validators/productValidator")


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
    createProductValidator,
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
    updateProductValidator,
    UpdateProduct
  )
  .get(getProductValidator,GetOneProduct)
  .delete(Protect, Allowed("admin"),deleteProductValidator, DeleteProduct);

module.exports = router;
