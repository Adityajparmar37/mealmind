const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Strips markdown code fences from a string if present.
 * @param {string} text
 * @returns {string}
 */
function stripMarkdown(text) {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
}

/**
 * Generates a full-day meal plan using Gemini AI.
 * @param {{ people: number, budget: number, diet: string, cuisine: string, allergies: string, dayType: string }} preferences
 * @returns {Promise<Object>} Parsed meal plan JSON
 */
async function generateMealPlan(preferences) {
  const { people, budget, diet, cuisine, allergies, dayType } = preferences;

  const prompt = `You are a smart Indian home meal planner. Based on the user's preferences below, generate a complete meal plan for the day.

User Preferences:
- Number of people: ${people}
- Budget: ₹${budget} per day (total for all people)
- Diet: ${diet}
- Cuisine preference: ${cuisine}
- Allergies/Dislikes: ${allergies || 'None'}
- Day type: ${dayType}

Return ONLY a valid JSON object with this EXACT structure (no markdown, no extra text, no explanation):
{
  "breakfast": {
    "name": "Dish Name",
    "description": "Brief 1-line description",
    "prepTime": "15 mins",
    "cookingSteps": ["Step 1", "Step 2", "Step 3"],
    "ingredients": ["ingredient 1", "ingredient 2"]
  },
  "lunch": {
    "name": "Dish Name",
    "description": "Brief 1-line description",
    "prepTime": "30 mins",
    "cookingSteps": ["Step 1", "Step 2", "Step 3"],
    "ingredients": ["ingredient 1", "ingredient 2"]
  },
  "dinner": {
    "name": "Dish Name",
    "description": "Brief 1-line description",
    "prepTime": "40 mins",
    "cookingSteps": ["Step 1", "Step 2", "Step 3"],
    "ingredients": ["ingredient 1", "ingredient 2"]
  },
  "snacks": {
    "name": "Snack Name",
    "description": "Brief 1-line description",
    "prepTime": "5 mins",
    "cookingSteps": ["Step 1", "Step 2"],
    "ingredients": ["ingredient 1", "ingredient 2"]
  },
  "groceryList": [
    { "item": "Tomatoes", "quantity": "4 medium", "estimatedCostINR": 20 }
  ],
  "substitutions": [
    { "original": "Paneer", "substitute": "Tofu", "reason": "Budget-friendly vegan option" }
  ],
  "budgetAnalysis": {
    "estimatedTotalCost": 420,
    "userBudget": ${budget},
    "feasibility": "Within Budget",
    "savingsTip": "Buy vegetables from local sabzi mandi to save ₹50"
  },
  "cookingToDoList": [
    { "time": "7:00 AM", "task": "Soak poha for breakfast", "duration": "5 mins" }
  ]
}`;

  const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
  const result = await model.generateContent(prompt);
  const rawText = result.response.text();
  const cleanText = stripMarkdown(rawText);

  try {
    return JSON.parse(cleanText);
  } catch {
    // Second attempt: find JSON object in the response
    const match = cleanText.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error('Gemini returned an unexpected response format.');
  }
}

module.exports = { generateMealPlan };
