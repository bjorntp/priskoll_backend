const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');

const PriceHistory = sequelize.define('PriceHistory', {
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oldPrices: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  newPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  changePercentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

module.exports = PriceHistory;
