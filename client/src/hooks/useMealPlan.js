import { useState } from 'react';
import { generateMealPlan } from '../api/mealApi';

export function useMealPlan() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function generate(preferences, onSuccess) {
    setLoading(true);
    setError('');
    try {
      const result = await generateMealPlan(preferences);
      setPlan(result.plan);
      onSuccess?.();
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to connect to the server. Is the backend running?'
      );
    } finally {
      setLoading(false);
    }
  }

  function loadPlan(savedPlan) {
    setPlan(savedPlan.generatedPlan);
  }

  return { plan, loading, error, generate, loadPlan };
}
