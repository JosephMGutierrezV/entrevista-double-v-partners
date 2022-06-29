const { Router } = require("express");
const {
  getData,
  setData,
  getAllData,
} = require("../controllers/products.controller");

const router = Router();

router.get("/get-products/:sku/:currency", getData);
router.post("/set-products", setData);
router.get("/get-sku-products", getAllData);

module.exports = router;
