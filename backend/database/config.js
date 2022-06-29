const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CNN_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("[Conectado a la base de datos]");
  } catch (errorDbConnection) {
    console.error(errorDbConnection);
    throw new Error(errorDbConnection);
  }
};

module.exports = {
  dbConnection,
};
