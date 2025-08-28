import { DataTypes } from "sequelize";
import { sequelize } from '../config/db';

export const OldPrices = sequelize.define('OldPrices', {
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
