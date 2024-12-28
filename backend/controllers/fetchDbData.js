const sequelize = require('../config/db');
const Product = require('../models/Product')
const PriceHistory = require('../models/PriceHistory');
const { where, Op } = require('sequelize');

const getApk = async (req, res) => {
  try {
    const productsApk = await Product.findAll({
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
    const productsLowered = await PriceHistory.findAll(
      {
        where: {
          changePercentage: {
            [Op.lt]: 1
          }
        },
        include: [
          {
            model: Product,
          }
        ]
      }
    )
    return res.status(200).json(productsLowered)
  } catch (error) {
    console.log(error)
    throw error;
  }
}

const getPriceChangesRaise = async (req, res) => {
  try {
    const productsLowered = await PriceHistory.findAll(
      {
        where: {
          changePercentage: {
            [Op.gt]: 1
          }
        }
      }
    )
    return res.status(200).json(productsLowered)
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
