const CurrencyStructure = require("../models/currency.model");
const ProductsStructure = require("../models/products.model");

const getData = async (req, res) => {
  try {
    console.log(`[EMPEZANDO: {getData}]`);
    const { sku, currency } = req.params;
    const { value } = await CurrencyStructure.findOne({ code: currency });
    const products = await ProductsStructure.find({ sku });

    if (products.length === 0) {
      return res.status(404).json({
        message: "Products not found",
      });
    }

    const responseProduct = [];
    console.log(`[PRODUCTS: ${JSON.stringify(products)}]`);
    for (const product of products) {
      if (product.currency !== currency) {
        console.log(`[CALCULANDO: {con diferente currency}]`);
        console.log(`[PRODUCT.currency: ${JSON.stringify(product.currency)}]`);
        const productValueCurrency = await CurrencyStructure.findOne({
          code: product.currency,
        }).exec();
        const newValue = (product.price / productValueCurrency.value) * value;
        console.log(`[newValue: ${newValue}]`);
        responseProduct.push({
          sku,
          currency,
          name: product.name,
          taxRate: product.taxRate,
          price: newValue,
          count: product.count,
        });
      } else {
        responseProduct.push({
          sku,
          currency,
          name: product.name,
          taxRate: product.taxRate,
          price: product.price,
          count: product.count,
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
    console.log(`[DATOS: ${JSON.stringify(products)}]`);
    const responseSkus = [];
    for (const product of products) {
      responseSkus.push({ name: product.sku, code: product.sku });
    }
    res.status(200).json({
      products: responseSkus,
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
