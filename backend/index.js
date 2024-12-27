const express = require('express');
const sequelize = require('./config/db');
const app = express();
const updateRoutes = require('./routes/updateRoutes')
const fetchRoutes = require('./routes/fetchRoutes')
const PORT = process.env.PORT || 3001;
const cors = require('cors')

async function init() {
  try {
    await sequelize.sync({ force: false });
    console.log("Synkroniserat tabellerna")
  } catch (error) {
    console.error("Ett fel uppstod: ", error);
  }
}

const corsOptions = {
  origin: ['http://localhost:5173', 'http://frontend:5173'], // Allow requests from localhost:3000 (your frontend)
  methods: ['GET', 'POST'], // Allow GET and POST requests
};

init();

app.use(express.json())
app.use(cors(corsOptions));
app.use('/api/update', updateRoutes)
app.use('/api/get', fetchRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
