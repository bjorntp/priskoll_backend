const express = require('express');
const sequelize = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;
const getWines = require('./jobs/getWines')
const getBeers = require('./jobs/getBeers')
const getSpirits = require('./jobs/getSpirits')

async function init() {
  try {
    await sequelize.sync({ force: false });
    console.log("Synkroniserat tabellerna")
  } catch (error) {
    console.error("Ett fel uppstod: ", error);
  }
}

init();

//getWines();
//getBeers();
//getSpirits();


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
