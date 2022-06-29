const CurrencyStructure = require("../models/currency.model");

const getData = async (req, res) => {
  try {
    console.log(`[EMPEZANDO: {getData}]`);
    const data = await CurrencyStructure.find();
    console.log(`[data: ${JSON.stringify(data)}]`);
    if (data.length === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    res.json({
      data,
    });
  } catch (errorGetData) {
    console.error(errorGetData);
    throw new Error(errorGetData);
  }
};

const setData = async (req, res) => {
  try {
    console.log(`[EMPEZANDO: {setData}]`);
    const { code, name, value } = req.body;
    const currency = new CurrencyStructure({
      code,
      name,
      value,
    });
    await currency.save();
    console.log(`[DATOCREADO: ${JSON.stringify(currency)}]`);
    res.status(200).json({
      message: "Currency created",
    });
  } catch (errorSetData) {
    console.error(errorSetData);
    throw new Error(errorSetData);
  }
};

module.exports = {
  getData,
  setData,
};
