export default function BudgetBadge({ budgetAnalysis }) {
  const { estimatedTotalCost, userBudget, feasibility, savingsTip } = budgetAnalysis;
  const ratio = estimatedTotalCost / userBudget;

  let badgeClass = 'within';
  let icon = '●';
  if (ratio > 1.2) {
    badgeClass = 'over';
    icon = '●';
  } else if (ratio > 1) {
    badgeClass = 'slightly-over';
    icon = '●';
  }

  return (
    <div className="budget-badge-wrapper">
      <div className={`budget-badge ${badgeClass}`}>
        <span>{icon}</span>
        {feasibility}
      </div>

      <div className="budget-numbers">
        <div>
          <div className="label">Estimated Cost</div>
          <div className="value">₹{estimatedTotalCost}</div>
        </div>
        <div>
          <div className="label">Your Budget</div>
          <div className="value">₹{userBudget}</div>
        </div>
      </div>

      {savingsTip && (
        <div className="savings-tip">
          <strong>Tip:</strong> {savingsTip}
        </div>
      )}
    </div>
  );
}
