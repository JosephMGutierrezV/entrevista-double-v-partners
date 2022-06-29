const CurrencyStructure = require("../models/currency.model");

const getData = async (req, res) => {
  try {
    console.log(`[EMPEZANDO: {getData}]`);
    const data = await CurrencyStructure.findAll();
    console.log(`[data: ${JSON.stringify(data)}]`);
    res.json({
      data,
    });
  } catch (errorGetData) {
    console.error(errorGetData);
    throw new Error(errorGetData);
  }
};
module.exports = {
  getData,
};
