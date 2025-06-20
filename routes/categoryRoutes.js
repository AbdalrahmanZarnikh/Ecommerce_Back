const express = require("express");

const router = express.Router();
const { Allowed, Protect } = require("../controllers/authController");
const {
  CreateCategory,
  GetAllCategories,
  GetOneCategory,
  UpdateCategory,
  DeleteCategory,
} = require("../controllers/categoryController");

const {upload } = require("../utils/MulterConfig");

const UploadImage = require("../middlewares/UploadImageMiddleware");

router
  .route("/")
  .get(GetAllCategories)
  .post(
    Protect,
    Allowed("admin"),
    upload.single("image"),
    UploadImage,
    CreateCategory
  );

router
  .route("/:id")
  .put(
    Protect,
    Allowed("admin"),
    upload.single("image"),
    UploadImage,
    UpdateCategory
  )
  .get(GetOneCategory)
  .delete(Protect, Allowed("admin"), DeleteCategory);

module.exports = router;
