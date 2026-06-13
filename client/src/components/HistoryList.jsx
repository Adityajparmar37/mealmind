function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HistoryList({ history, onSelect, onDelete }) {
  if (!history.length) return null;

  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <div className="section-title">Recent Plans</div>
      <div className="history-list">
        {history.map((h) => (
          <div key={h._id} className="history-item" onClick={() => onSelect(h)}>
            <div className="history-item-info">
              <div>
                {h.userPreferences.diet} · {h.userPreferences.cuisine}
                {' '}· ₹{h.userPreferences.budget}
              </div>
              <div className="history-item-meta">
                {h.userPreferences.people} people · {h.userPreferences.dayType}
                {' · '}{formatDate(h.createdAt)}
              </div>
            </div>
            <button
              className="history-delete"
              onClick={(e) => onDelete(h._id, e)}
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
