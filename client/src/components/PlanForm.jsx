import { useState } from 'react';

const DIET_OPTIONS = ['Vegetarian', 'Non-Vegetarian', 'Vegan'];
const CUISINE_OPTIONS = ['Indian', 'Italian', 'Chinese', 'Mediterranean', 'Mixed'];
const DAY_OPTIONS = ['Weekday', 'Weekend', 'Special Occasion'];

export default function PlanForm({ onSubmit, loading, error }) {
  const [form, setForm] = useState({
    people: 2,
    budget: 500,
    diet: 'Vegetarian',
    cuisine: 'Indian',
    allergies: '',
    dayType: 'Weekday',
  });

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form className="plan-form" onSubmit={handleSubmit}>
      {error && <div className="error-banner">{error}</div>}

      <div className="form-group">
        <label>Number of People</label>
        <input
          type="number"
          min={1}
          max={10}
          value={form.people}
          onChange={(e) => set('people', Number(e.target.value))}
          required
        />
      </div>

      <div className="form-group">
        <label>Daily Budget (₹ INR)</label>
        <input
          type="number"
          min={50}
          value={form.budget}
          onChange={(e) => set('budget', Number(e.target.value))}
          required
        />
      </div>

      <div className="form-group">
        <label>Diet Preference</label>
        <div className="radio-group">
          {DIET_OPTIONS.map((opt) => (
            <label key={opt} className={`radio-option ${form.diet === opt ? 'selected' : ''}`}>
              <input
                type="radio"
                name="diet"
                value={opt}
                checked={form.diet === opt}
                onChange={() => set('diet', opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Cuisine Preference</label>
        <select value={form.cuisine} onChange={(e) => set('cuisine', e.target.value)}>
          {CUISINE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Allergies / Dislikes (optional)</label>
        <textarea
          placeholder="e.g. nuts, dairy, spicy food..."
          value={form.allergies}
          onChange={(e) => set('allergies', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Day Type</label>
        <div className="radio-group">
          {DAY_OPTIONS.map((opt) => (
            <label key={opt} className={`radio-option ${form.dayType === opt ? 'selected' : ''}`}>
              <input
                type="radio"
                name="dayType"
                value={opt}
                checked={form.dayType === opt}
                onChange={() => set('dayType', opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Generating...' : 'Generate My Meal Plan'}
      </button>
    </form>
  );
}
