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

const {uploadSingle}=require("../utils/MulterSingle")

const UploadImage=require("../middlewares/UploadImageMiddleware")

router.use(Protect,Allowed("admin"))

router.route("/").get(GetAllCategories).post(uploadSingle.single("image"),UploadImage,CreateCategory);

router
  .route("/:id")
  .put(uploadSingle.single("image"),UploadImage,UpdateCategory)
  .get(GetOneCategory)
  .delete(DeleteCategory);

module.exports = router;
