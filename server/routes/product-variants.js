const express = require("express");
const router = express.Router();

const { isAdmin, verifyJwtToken } = require("../middlewares");
const {
  create,
  getAll,
  get,
  update,
  deleteProductVariant,
  addBanner,
  replaceBanner,
  removeBanner,
} = require("../controllers/productVariants");

router.post("/create", isAdmin, create);
router.get("/getAll", verifyJwtToken, getAll);
router.get("/get/:id", verifyJwtToken, get);
router.put("/update/:id", isAdmin, update);
router.post("/:id/banners/add", isAdmin, addBanner);
router.put("/:id/banners/replace/:bannerId", isAdmin, replaceBanner);
router.delete("/:id/banners/remove/:bannerId", isAdmin, removeBanner);
router.delete("/delete/:id", isAdmin, deleteProductVariant);

module.exports = router;
