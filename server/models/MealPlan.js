const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
  userPreferences: {
    people: Number,
    budget: Number,
    diet: String,
    cuisine: String,
    allergies: String,
    dayType: String,
  },
  generatedPlan: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);
