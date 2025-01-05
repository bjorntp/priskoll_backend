const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acguire: 3600000,
    idle: 3600000,
  },
  query: {
    timeout: 3600000
  },
});

module.exports = sequelize;
