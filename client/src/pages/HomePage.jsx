import PlanForm from '../components/PlanForm';
import MealPlanResult from '../components/MealPlanResult';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import HistoryList from '../components/HistoryList';
import { useMealPlan } from '../hooks/useMealPlan';
import { useHistory } from '../hooks/useHistory';

export default function HomePage() {
  const { plan, loading, error, generate, loadPlan } = useMealPlan();
  const { history, refetch, remove } = useHistory();

  function handleGenerate(preferences) {
    generate(preferences, refetch);
  }

  function handleSelect(savedPlan) {
    loadPlan(savedPlan);
  }

  return (
    <>
      <header className="app-header">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="14" fill="rgba(255,255,255,0.15)"/>
          <path d="M8 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <rect x="11" y="14" width="6" height="5" rx="1.5" fill="#fff"/>
          <rect x="13" y="10" width="2" height="5" rx="1" fill="#F4A261"/>
        </svg>
        <h1>MealMind</h1>
        <span>AI-powered meal planning</span>
      </header>

      <div className="app-body">
        <aside>
          <div className="card">
            <div className="section-title">Plan My Day</div>
            <PlanForm onSubmit={handleGenerate} loading={loading} error={error} />
          </div>
          <HistoryList history={history} onSelect={handleSelect} onDelete={remove} />
        </aside>

        <main>
          {loading ? (
            <LoadingState />
          ) : plan ? (
            <MealPlanResult plan={plan} />
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </>
  );
}
