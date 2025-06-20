const express = require("express");

const router = express.Router();

const { Allowed, Protect } = require("../controllers/authController");
const {getAllBrands , getBrand , createBrand , updateBrand , deleteBrand} = require("../controllers/brandController");


const {uploadSingle}=require("../utils/MulterSingle")

const UploadImage=require("../middlewares/UploadImageMiddleware")

router.use(Protect,Allowed("admin"))
router.route("/").get(getAllBrands).post(uploadSingle.single("image"),UploadImage,createBrand);

router.route("/:id").get(getBrand).put(uploadSingle.single("image"),UploadImage,updateBrand).delete(deleteBrand);

module.exports = router;