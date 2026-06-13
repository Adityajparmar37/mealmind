import { useState } from 'react';

const MEAL_COLORS = {
  breakfast: '#2D6A4F',
  lunch: '#1D4E89',
  dinner: '#6B2D8B',
  snacks: '#C05621',
};

export default function MealCard({ label, meal }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="meal-card">
      <div className="meal-card-header" style={{ background: MEAL_COLORS[label] }}>
        <span className="meal-label">{label}</span>
        <span className="meal-prep-time">{meal.prepTime}</span>
      </div>
      <div className="meal-card-body">
        <div className="meal-name">{meal.name}</div>
        <div className="meal-description">{meal.description}</div>
        <button className="meal-details-toggle" onClick={() => setOpen((v) => !v)}>
          {open ? 'Hide Details' : 'Show Details'}
        </button>

        {open && (
          <div className="meal-steps">
            <h4>Cooking Steps</h4>
            <ol>
              {meal.cookingSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <div className="ingredients-list" style={{ marginTop: '0.75rem' }}>
              {meal.ingredients.map((ing, i) => (
                <span key={i} className="ingredient-tag">{ing}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
