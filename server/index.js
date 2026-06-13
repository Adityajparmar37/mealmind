const app = require('./app');

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`MealMind server running on port ${PORT}`));
