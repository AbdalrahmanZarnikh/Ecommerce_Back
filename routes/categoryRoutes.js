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

const {createCategoryValidator,getCategoryValidator,updateCategoryValidator,deleteCategoryValidator} =require("../utils/validators/categoryValidator")

const UploadImage = require("../middlewares/UploadImageMiddleware");

router
  .route("/")
  .get(GetAllCategories)
  .post(
    Protect,
    Allowed("admin"),
    upload.single("image"),
    UploadImage,
    createCategoryValidator,
    CreateCategory
  );

router
  .route("/:id")
  .put(
    Protect,
    Allowed("admin"),
    upload.single("image"),
    UploadImage,
    updateCategoryValidator,
    UpdateCategory
  )
  .get(getCategoryValidator,GetOneCategory)
  .delete(Protect, Allowed("admin"),deleteCategoryValidator, DeleteCategory);

module.exports = router;
