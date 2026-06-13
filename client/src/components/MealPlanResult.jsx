import MealCard from './MealCard';
import GroceryList from './GroceryList';
import TodoChecklist from './TodoChecklist';
import BudgetBadge from './BudgetBadge';

export default function MealPlanResult({ plan }) {
  const { breakfast, lunch, dinner, snacks, groceryList, substitutions, budgetAnalysis, cookingToDoList } = plan;

  return (
    <div className="meal-plan-result">
      {/* Meal Cards */}
      <div>
        <div className="section-title">Today's Meals</div>
        <div className="meal-cards-grid">
          <MealCard label="breakfast" meal={breakfast} />
          <MealCard label="lunch" meal={lunch} />
          <MealCard label="dinner" meal={dinner} />
          <MealCard label="snacks" meal={snacks} />
        </div>
      </div>

      {/* Budget */}
      <div className="card">
        <div className="section-title">Budget Analysis</div>
        <BudgetBadge budgetAnalysis={budgetAnalysis} />
      </div>

      {/* Substitutions */}
      {substitutions && substitutions.length > 0 && (
        <div className="card">
          <div className="section-title">Smart Substitutions</div>
          <div className="substitutions-list">
            {substitutions.map((sub, i) => (
              <span key={i} className="sub-pill">
                {sub.original}
                <span className="arrow">→</span>
                {sub.substitute}
                <span className="sub-reason"> ({sub.reason})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cooking To-Do */}
      <div className="card">
        <div className="section-title">Cooking To-Do List</div>
        <TodoChecklist tasks={cookingToDoList} />
      </div>

      {/* Grocery List */}
      <div className="card">
        <div className="section-title">Grocery List</div>
        <GroceryList groceryList={groceryList} />
      </div>
    </div>
  );
}
