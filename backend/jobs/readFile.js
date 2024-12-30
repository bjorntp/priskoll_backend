const PriceHistory = require('../models/PriceHistory');
const Product = require('../models/Product');
const fetchProductData = require('../controllers/fetchProductData');
const parsedData = require('../systembolagetapi/archived_data.json')

const addData = async (element) => {
  const dbProduct = await Product.findOne({ where: { productId: element.productId } });
  if (dbProduct) {
    const percentage = element.price / dbProduct.price;
    if (dbProduct.price !== element.price) {
      const history = await PriceHistory.findOne({ where: { productId: element.productId } });
      if (history) {
        history.oldPrices = [{ oldPrice: history.newPrice, newPrice: element.price, updatedAt: new Date() }, ...history.oldPrices]
        history.oldPrice = history.newPrice;
        history.newPrice = element.price;
        history.changePercentage = percentage;
        await history.save();
      } else {
        await PriceHistory.create({
          productId: element.productId,
          oldPrices: [
            { oldPrice: dbProduct.price, newPrice: element.price, updatedAt: new Date() }
          ],
          oldPrice: dbProduct.price,
          newPrice: element.price,
          changePercentage: percentage,
        });
      }
      await dbProduct.update(element);
      console.log("Edited: " + element.productId)
    }
    return null;
  } else {
    const apk = (element.volume * (element.alcoholPercentage / 100)) / element.price;
    element.apk = apk;
    console.log("Added new: " + element.productId)
    return element;
  }
};

const readDataFromJSON = async () => {
  let newElementsArray = [];
  for (const element of parsedData) {
    let x = await addData(element);
    if (x) {
      newElementsArray.push(x)
    }
  }
  Product.bulkCreate(newElementsArray, {
    ignoreDuplicates: true,
  });
}

module.exports = readDataFromJSON;
