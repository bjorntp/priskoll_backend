const updateData = require('../controllers/updateData')

const getSpirits = () => {
  let sprit = ['assortment', '--category', "Sprit"];
  updateData(sprit);
}

module.exports = getSpirits;
