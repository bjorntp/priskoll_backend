const PriceHistory = require('../models/PriceHistory');
const Product = require('../models/Product');
const fetchProductData = require('./fetchProductData');

const addData = async (element) => {
  const dbProduct = await Product.findOne({ where: { productId: element.productId } });
  if (dbProduct) {
    const percentage = element.price / dbProduct.price;
    if (dbProduct.price !== element.price) {
      const history = await PriceHistory.findOne({ where: { productId: element.productId } });
      if (history) {
        history.oldPrices = [{ oldPrice: history.newPrice, newPrice: element.price, updatedAt: new Date() }, ...history.oldPrices]
        history.newPrice = element.price;
        history.changePercentage = percentage;
        await history.save();
      } else {
        await PriceHistory.create({
          productId: element.productId,
          oldPrices: [
            { oldPrice: dbProduct.price, newPrice: element.price, updatedAt: new Date() }
          ],
          newPrice: element.price,
          changePercentage: percentage,
        });
      }
      dbProduct.update(element);
    }
  } else {
    const apk = (element.volume * (element.alcoholPercentage / 100)) / element.price;
    element.apk = apk;
    return element;
  }
};

const updateData = async (args) => {
  let executablePath = './systembolagetapi/sysapi'
  let parsedData = await fetchProductData(executablePath, args);
  let newElementsArray = [];
  for (const element of parsedData) {
    let x = await addData(element);
    if (x) {
      newElementsArray.push(x)
    }
  }
  Product.bulkCreate(newElementsArray);
}

module.exports = updateData;
