const { Router } = require("express");
const { getData } = require("../controllers/products.controller");

const router = Router();

router.get("/get-products", getData);

module.exports = router;
