import { useState, useEffect } from 'react';
import { fetchHistory, deletePlan } from '../api/mealApi';

export function useHistory() {
  const [history, setHistory] = useState([]);

  function refetch() {
    fetchHistory()
      .then(setHistory)
      .catch(() => {});
  }

  useEffect(() => {
    refetch();
  }, []);

  async function remove(id, e) {
    e.stopPropagation();
    try {
      await deletePlan(id);
      setHistory((prev) => prev.filter((h) => h._id !== id));
    } catch {
      // ignore
    }
  }

  return { history, refetch, remove };
}
