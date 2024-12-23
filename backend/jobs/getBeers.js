const updateData = require('../controllers/updateData')

const getBeers = () => {
  let beer = ['assortment', '--category', "Öl"];
  updateData(beer);
}

module.exports = getBeers;
