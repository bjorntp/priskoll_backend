const updateData = require('../controllers/updateData')

const getSpirits = async (req, res) => {
  console.log("Updating spirit data")
  try {
    let sprit = ['assortment', '--category', "Sprit"];
    await updateData(sprit);
    return res.status(201).send('Updated spirit data')
  } catch (error) {
    console.log('Error: ', error);
    return res.status(500).send(`Internal server error: ${error.message}`)
  }
}

module.exports = getSpirits;
