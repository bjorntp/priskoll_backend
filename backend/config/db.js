const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('systembolaget_priser', 'user', 'password', {
  host: 'mysql_container',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acguire: 3600000,
    idle: 3600000,
  },
  query: {
    timeout: 3600000
  }
});

module.exports = sequelize;
