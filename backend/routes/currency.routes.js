const { Router } = require("express");
const { getData, setData } = require("../controllers/currency.controller");

const router = Router();

router.get("/get-currency", getData);
router.post("/set-currency", setData);

module.exports = router;
