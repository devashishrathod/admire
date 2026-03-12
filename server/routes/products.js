const express = require("express");
const router = express.Router();

const { isAdmin, verifyJwtToken } = require("../middlewares");
const {
  create,
  getAll,
  getOne,
  update,
  deleteProduct,
  addBanner,
  replaceBanner,
  removeBanner,
  addProductLocations,
  removeProductLocations,
} = require("../controllers/products");

router.post("/create", isAdmin, create);
router.get("/getAll", verifyJwtToken, getAll);
router.get("/get/:id", verifyJwtToken, getOne);
router.put("/update/:id", isAdmin, update);
router.post("/:id/banners/add", isAdmin, addBanner);
router.put("/:id/banners/replace/:bannerId", isAdmin, replaceBanner);
router.delete("/:id/banners/remove/:bannerId", isAdmin, removeBanner);
router.delete("/delete/:id", isAdmin, deleteProduct);
router.put(
  "/update-product-locations/:productId",
  // isAdmin,
  addProductLocations,
);
router.delete(
  "/remove-product-locations/:productId",
  // isAdmin,
  removeProductLocations,
);

module.exports = router;
