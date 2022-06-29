const { Schema, model } = require("mongoose");

const CurrencySchema = Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: Number,
  },
});

module.exports = model("CurrencyStructure", CurrencySchema);
