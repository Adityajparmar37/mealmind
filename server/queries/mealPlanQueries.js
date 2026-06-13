const MealPlan = require('../models/MealPlan');

async function saveMealPlan(userPreferences, generatedPlan) {
  return MealPlan.create({ userPreferences, generatedPlan });
}

async function getHistory() {
  return MealPlan.find().sort({ createdAt: -1 }).limit(5).lean();
}

async function deleteMealPlanById(id) {
  return MealPlan.findByIdAndDelete(id);
}

module.exports = { saveMealPlan, getHistory, deleteMealPlanById };
