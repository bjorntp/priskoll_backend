const { Sequelize, DataTypes } = require("sequelize");


const Product = Sequelize.define('Product', {
  systemBolagetId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lastChecked: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subType: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});
