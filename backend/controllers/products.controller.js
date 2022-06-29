const CurrencyStructure = require("../models/currency.model");
const ProductsStructure = require("../models/products.model");

const getData = async (req, res) => {
  try {
    console.log(`[EMPEZANDO: {getData}]`);
    const { sku, currency } = req.query;
    const { value } = await CurrencyStructure.findOne({ code: currency });
    const product = await ProductsStructure.findOne({ sku });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    if (product.currency !== currency) {
      console.log(`[CALCULANDO: {con diferente currency}]`);
      const productValueCurrency = await CurrencyStructure.findOne({
        code: product.currency,
      });
      console.log(
        `[product.price: ${product.price}], [productValueCurrency.value: ${productValueCurrency.value}], [value: ${value}]`
      );
      const newValue = (product.price / productValueCurrency.value) * value;
      console.log(`[newValue: ${newValue}]`);
      const responseProduct = {
        sku,
        currency,
        name: product.name,
        taxRate: product.taxRate,
        price: newValue,
      };
      res.status(200).json({
        product: responseProduct,
      });
    }
    const responseProduct = {
      sku,
      currency,
      name: product.name,
      taxRate: product.taxRate,
      price: product.price,
    };
    res.status(200).json({
      product: responseProduct,
    });
  } catch (errorGetData) {
    console.error(errorGetData);
    throw new Error(errorGetData);
  }
};
module.exports = {
  getData,
};
