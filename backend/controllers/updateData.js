const PriceHistory = require('../models/PriceHistory');
const Product = require('../models/Product');
const fetchProductData = require('./fetchProductData');

const addData = async (element) => {
  const dbProduct = await Product.findOne({ where: { productId: element.productId } });
  if (dbProduct) {
    if (dbProduct.price !== element.price) {
      const history = await PriceHistory.findOne({ where: { productId: element.productId } });
      if (history) {
        history.oldPrices.push({
          oldPrices: history.newPrice,
          newPrice: element.price,
          updatedAt: new Date(),
        });
      } else {
        await PriceHistory.create({
          productId: element.productId,
          oldPrices: [
            { oldPrice: dbProduct.price, newPrice: element.price, updatedAt: new Date() }
          ],
          newPrice: element.price,
        });
      }
      dbProduct.update(element);
      console.log("nytt pris")
    }
  } else {
    const apk = (element.volume * (element.alcoholPercentage / 100)) / element.price;
    console.log("Volume, ", element.volume);
    console.log("Volume, ", element.volume);
    console.log(typeof apk, "    -     ", apk);
    element.apk = apk;
    await Product.create(element);
    console.log("New product created");
  }
};

const updateData = async () => {
  try {
    let executablePath = './systembolagetapi/sysapi'
    let args = ['assortment', '--category', "Vin", '--subcategory', 'Rött vin', '--origin', 'Italien'];
    let parsedData = await fetchProductData(executablePath, args);
    parsedData.forEach(element => {
      addData(element);
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateData;
