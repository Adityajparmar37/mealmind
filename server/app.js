require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mealPlanRoutes = require('./routes/mealPlan');

const app = express();

let isConnected = false;

async function connectDB() {
  if (isConnected || mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.warn('MongoDB connection failed (app will still work):', err.message);
  }
}

// Ensure DB is connected on every request (safe to call multiple times)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(cors());
app.use(express.json());

app.use('/api/meal-plan', mealPlanRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
