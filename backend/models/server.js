const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.currencyPath = "/api/currency";
    this.productsPath = "/api/products";

    this.connectDb();
    this.middleware();
    this.routes();
  }

  async connectDb() {
    await dbConnection();
  }

  middleware() {
    this.app.use(cors());
    this.app.options("*", cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.currencyPath, require("../routes/currency.routes"));
    this.app.use(this.productsPath, require("../routes/products.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`[Servidor iniciado en el puerto: ${this.port}]`);
    });
  }
}

module.exports = Server;
