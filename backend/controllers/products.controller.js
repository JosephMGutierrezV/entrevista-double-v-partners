const CurrencyStructure = require("../models/currency.model");
const ProductsStructure = require("../models/products.model");

const getData = async (req, res) => {
  try {
    console.log(`[EMPEZANDO: {getData}]`);
  } catch (errorGetData) {
    console.error(errorGetData);
    throw new Error(errorGetData);
  }
};
module.exports = {
  getData,
};
