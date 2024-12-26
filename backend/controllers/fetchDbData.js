const sequelize = require('../config/db');
const productDB = require('../models/Product')
const priceDB = require('../models/PriceHistory')

const getApk = async (req, res) => {
  try {
    const productsApk = await productDB.findAll({
      order: [['apk', 'DESC']],
      limit: 50,
    });
    if (productsApk) {
      return res.status(200).json(productsApk)
    } else {
      return res.status(404).json({ message: 'No products found' })
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getPriceChangesLower = async (req, res) => {
  try {

  } catch (error) {
    console.log(error)
    throw error;
  }
}

const getPriceChangesRaise = async (req, res) => {
  try {

  } catch (error) {
    console.log(error)
    throw error;
  }

}

module.exports = {
  getApk,
  getPriceChangesLower,
  getPriceChangesRaise
}
