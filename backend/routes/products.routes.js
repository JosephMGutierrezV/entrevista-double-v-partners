const { Router } = require("express");
const { getData, setData } = require("../controllers/products.controller");

const router = Router();

router.get("/get-products", getData);
router.post("/set-products", setData);

module.exports = router;
