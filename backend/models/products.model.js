const { Schema, model } = require("mongoose");

const ProductsSchema = Schema({
  sku: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  currency: {
    type: String,
  },
  taxRate: {
    type: Number,
  },
});

module.exports = model("ProductsStructure", ProductsSchema);
