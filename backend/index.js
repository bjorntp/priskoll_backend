const express = require('express');
const sequelize = require('./config/db');
const app = express();
const updateRoutes = require('./routes/updateRoutes')
const fetchRoutes = require('./routes/fetchRoutes')
const PORT = process.env.PORT || 3000;

async function init() {
  try {
    await sequelize.sync({ force: false });
    console.log("Synkroniserat tabellerna")
  } catch (error) {
    console.error("Ett fel uppstod: ", error);
  }
}

init();

app.use(express.json())
app.use('/api/update', updateRoutes)
app.use('/api/get', fetchRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
