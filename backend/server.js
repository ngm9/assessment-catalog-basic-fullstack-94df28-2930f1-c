const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple health check endpoint for run.sh
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Register API routes
app.use('/api', apiRoutes);

// Start listening immediately so the /health endpoint is reachable
// even before MongoDB finishes initializing.
app.listen(PORT, () => {
  console.log(`Backend API server listening on port ${PORT}`);
});

// Connect to MongoDB using Mongoose
// Hardcoded connection details (see docker-compose.yml)
const mongoUser = 'utkrusht';
const mongoPass = 'utkrushtpass';
const mongoHost = 'mongodb';
const mongoPort = 27017;
const mongoDbName = 'utkrusht_assessments';

const mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDbName}?authSource=admin`;

// Retry MongoDB connection until it succeeds.
// MongoDB may still be initializing when this container first starts,
// so we loop with a delay rather than crashing the process.
async function connectWithRetry() {
  while (true) {
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log('Connected to MongoDB');
      break;
    } catch (err) {
      console.error('Failed to connect to MongoDB, retrying in 5s:', err.message);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

connectWithRetry();
