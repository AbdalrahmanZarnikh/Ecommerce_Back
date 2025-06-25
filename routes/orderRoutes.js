const express = require("express");

const router = express.Router();

const { Allowed, Protect } = require("../controllers/authController");

const {
  CreateCashOrder,
  CreateHawalaOrder,
  UpdateOrderToPaid,
  FindAllOrders,
  FindSpecificOrder,
  filterOrderForLoggedUser,
} = require("../controllers/orderController");

const { upload } = require("../utils/MulterConfig");
const UploadImage = require("../middlewares/UploadImageMiddleware");

router.use(Protect);

router.post("/cash/:cartId", CreateCashOrder);
router.post(
  "/hawala/:cartId",
    upload.single("hawalaCode"),
    UploadImage,
  CreateHawalaOrder
);

router.get(
  "/",
  Allowed("user", "admin"),
  filterOrderForLoggedUser,
  FindAllOrders
);

router.get("/:orderId", FindSpecificOrder);

router.put("/:orderId/pay", Allowed("admin"), UpdateOrderToPaid);

module.exports = router;
