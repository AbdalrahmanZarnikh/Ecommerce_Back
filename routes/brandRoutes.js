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

const { upload } = require("../utils/MulterConfig");

const UploadImage = require("../middlewares/UploadImageMiddleware");


router
  .route("/")
  .get(getAllBrands)
  .post(Protect, Allowed("admin"),upload.single("image"), UploadImage, createBrand);

router
  .route("/:id")
  .get(getBrand)
  .put(Protect, Allowed("admin"),upload.single("image"), UploadImage, updateBrand)
  .delete(Protect, Allowed("admin"),deleteBrand);

module.exports = router;
