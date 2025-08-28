import express from 'express';
const app = express();
import fetchRoutes from './routes/fetchRoutes';
import updateRoutes from './routes/updateRoutes';
const PORT = Number(process.env.PORT) || 3001;
import cors from 'cors';
import { sequelize } from './config/db';

async function init() {
  try {
    await sequelize.sync({ force: false });
    console.log("Synkroniserat tabellerna")
  } catch (error) {
    console.error("Ett fel uppstod: ", error);
  }
}

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
};

init();

app.use(express.json())
app.use(cors(corsOptions));
app.use('/api/update', updateRoutes)
app.use('/api/get', fetchRoutes)

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.timeout = 600000;
