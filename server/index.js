import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import predictRoutes from './routes/predict.routes.js';
import researchRoutes from './routes/research.routes.js';
import metricsRoutes from './routes/metrics.routes.js';
import reportsRoutes from './routes/reports.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/predict', predictRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/reports', reportsRoutes);

// Health Check
app.get('/api/ping', (req, res) => {
  res.json({
    status: 'ok',
    message: 'pong',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
