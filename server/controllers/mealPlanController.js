const { generateMealPlan } = require('../services/geminiService');
const queries = require('../queries/mealPlanQueries');

async function generate(req, res) {
  const { people, budget, diet, cuisine, allergies, dayType } = req.body;

  if (!people || !budget || !diet || !cuisine || !dayType) {
    return res.status(400).json({ error: 'Missing required preferences.' });
  }

  try {
    const plan = await generateMealPlan({ people, budget, diet, cuisine, allergies, dayType });

    try {
      await queries.saveMealPlan({ people, budget, diet, cuisine, allergies, dayType }, plan);
    } catch (dbErr) {
      console.warn('Could not save plan to DB:', dbErr.message);
    }

    return res.json({ success: true, plan });
  } catch (err) {
    console.error('Gemini error:', err.message);
    return res.status(500).json({ error: 'AI returned an unexpected response. Please try again.' });
  }
}

async function getHistory(req, res) {
  try {
    const plans = await queries.getHistory();
    return res.json({ plans });
  } catch (err) {
    return res.status(500).json({ error: 'Could not fetch history.' });
  }
}

async function deletePlan(req, res) {
  try {
    await queries.deleteMealPlanById(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Could not delete plan.' });
  }
}

module.exports = { generate, getHistory, deletePlan };
