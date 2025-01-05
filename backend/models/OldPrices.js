const { DataTypes } = require("sequelize");
const sequelize = require('../config/db');

const OldPrices = sequelize.define('OldPrices', {
  newPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  oldPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = OldPrices;
