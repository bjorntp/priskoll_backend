import { DataTypes } from "sequelize";
import { sequelize } from '../config/db';

export const PriceHistory = sequelize.define('PriceHistory', {
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
