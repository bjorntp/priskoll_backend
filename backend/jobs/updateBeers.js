const updateData = require('../controllers/updateData')

const getBeers = async (req, res) => {
  console.log("Updating beer data")
  try {
    let beer = ['assortment', '--category', "Öl"];
    await updateData(beer);
    return res.status(201).send('Updated beers')
  } catch (error) {
    return res.status(500).send('Internal server error: ', error)
  }
}

module.exports = getBeers;
