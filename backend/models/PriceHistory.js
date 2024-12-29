const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');

const PriceHistory = sequelize.define('PriceHistory', {
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  oldPrices: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  oldPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
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
