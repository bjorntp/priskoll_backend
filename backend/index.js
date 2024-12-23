const express = require('express');
const sequelize = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;
const updateData = require('./controllers/updateData');

app.get('/', (req, res) => {
  res.send('Hello world! AGAIN! AND ONCE MORE!');
});

async function init() {
  try {
    await sequelize.sync({ force: false });
    console.log("Synkroniserat tabellerna")
  } catch (error) {
    console.error("Ett fel uppstod: ", error);
  }
}

init();
updateData();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
