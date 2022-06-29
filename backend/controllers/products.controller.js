const CurrencyStructure = require("../models/currency.model");
const ProductsStructure = require("../models/products.model");

const getData = async (req, res) => {
  try {
    console.log(`[EMPEZANDO: {getData}]`);
    const { sku, currency } = req.query;
    const { value } = await CurrencyStructure.findOne({ code: currency });
    const products = await ProductsStructure.find({ sku });

    if (products.length === 0) {
      return res.status(404).json({
        message: "Products not found",
      });
    }
    
    const responseProduct = [];
    for (const product in products) {
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
        responseProduct.push({
          sku,
          currency,
          name: product.name,
          taxRate: product.taxRate,
          price: newValue,
        });
      } else {
        responseProduct.push({
          sku,
          currency,
          name: products.name,
          taxRate: products.taxRate,
          price: products.price,
        });
      }
    }
    res.status(200).json({
      product: responseProduct,
    });
  } catch (errorGetData) {
    console.error(errorGetData);
    throw new Error(errorGetData);
  }
};

const setData = async (req, res) => {
  try {
    console.log(`[EMPEZANDO: {setData}]`);
    const { sku, currency, price, name, taxRate } = req.body;
    const product = new ProductsStructure({
      sku,
      currency,
      price,
      name,
      taxRate,
    });
    await product.save();
    console.log(`[DATOCREADO: ${JSON.stringify(product)}]`);
    res.status(200).json({
      message: "Product created",
    });
  } catch (errorSetData) {
    console.error(errorSetData);
    throw new Error(errorSetData);
  }
};

const getAllData = async (req, res) => {
  try {
    console.log(`[EMPEZANDO: {getAllData}]`);
    const products = await ProductsStructure.find();
    res.status(200).json({
      products: products.sku,
    });
  } catch (errorGetAllData) {
    console.error(errorGetAllData);
    throw new Error(errorGetAllData);
  }
};

module.exports = {
  getData,
  setData,
  getAllData,
};
