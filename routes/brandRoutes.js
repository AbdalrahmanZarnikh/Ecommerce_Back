const express = require("express");

const router = express.Router();

const { Allowed, Protect } = require("../controllers/authController");
const {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");


const {createBrandValidator,getBrandValidator,updateBrandValidator,deleteBrandValidator} =require("../utils/validators/brandValidator")

const { upload } = require("../utils/MulterConfig");

const UploadImage = require("../middlewares/UploadImageMiddleware");


router
  .route("/")
  .get(getAllBrands)
  .post(Protect, Allowed("admin"),upload.single("image"), UploadImage, createBrandValidator,createBrand);

router
  .route("/:id")
  .get(getBrandValidator,getBrand)
  .put(Protect, Allowed("admin"),upload.single("image"), UploadImage, updateBrandValidator,updateBrand)
  .delete(Protect, Allowed("admin"),deleteBrandValidator,deleteBrand);

module.exports = router;
