const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const caterersRouter = require('./routes/caterers');
const errorHandler = require('./middlewares/errorHandler');

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/caterers', caterersRouter);

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'CaterersNearMe API is running.' });
});
app.use(errorHandler);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start();
