const { Router } = require("express");
const { getData } = require("../controllers/currency.controller");

const router = Router();

router.get("/get-currency", getData);

module.exports = router;
