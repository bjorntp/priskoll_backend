const sequelize = require('../config/db');
const Product = require('../models/Product')
const PriceHistory = require('../models/PriceHistory');
const OldPrices = require('../models/OldPrices')
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
    console.error(error);
    throw error;
  }
}

const getDates = async (req, res) => {
  try {
    const uniqueUpdatedAt = await OldPrices.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('updatedAt')), 'updatedAt']
      ],
      group: [sequelize.fn('DATE', sequelize.col('updatedAt'))],
      raw: true,
    })
    return res.status(200).json(uniqueUpdatedAt)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getPriceChangesLower = async (req, res) => {
  try {
    let { sort } = req.query;
    let order = [["newPrice", "ASC"]]
    if (sort === "priceabs") {
      order = [["newPrice", "ASC"]]
    } else if (sort === "percentage") {
      order = [["changePercentage", "ASC"]]
    } else if (sort === "alphabetical") {
      order = [[{ model: Product }, 'productNameBold', "ASC"]]
    } else if (sort == "category") {
      order = [[{ model: Product }, 'categoryLevel2']]
    }
    const productsLowered = await PriceHistory.findAll(
      {
        where: {
          changePercentage: {
            [Op.lt]: .9
          },
          oldPrice: {
            [Op.gt]: 90
          }
        },
        include: [
          {
            model: Product,
          },
          {
            model: OldPrices,
            order: [['updatedAt', 'ASC']],
          }
        ],
        order,
      }
    )
    return res.status(200).json(productsLowered)
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const getPriceChangesRaise = async (req, res) => {
  try {
    let { sort } = req.query;
    let order = [["newPrice", "DESC"]]
    if (sort === "priceabs") {
      order = [["newPrice", "DESC"]]
    } else if (sort === "percentage") {
      order = [["changePercentage", "DESC"]]
    } else if (sort === "alphabetical") {
      order = [[{ model: Product }, 'productNameBold', "ASC"]]
    } else if (sort == "category") {
      order = [[{ model: Product }, 'categoryLevel1']]
    }
    const productsLowered = await PriceHistory.findAll(
      {
        where: {
          changePercentage: {
            [Op.gt]: 1.1
          }
        },
        include: [
          {
            model: Product,
          },
          {
            model: OldPrices,
            order: [['updatedAt', 'ASC']],
          }
        ],
        order,
      }
    )
    return res.status(200).json(productsLowered)
  } catch (error) {
    console.error(error)
    throw error;
  }
}

module.exports = {
  getApk,
  getPriceChangesLower,
  getPriceChangesRaise,
  getDates
}
