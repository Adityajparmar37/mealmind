export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="36" cy="36" r="36" fill="#F0FAF5"/>
          <ellipse cx="36" cy="48" rx="18" ry="4" fill="#B7E4C7"/>
          <path d="M20 34c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="29" y="34" width="14" height="10" rx="3" fill="#2D6A4F"/>
          <rect x="34" y="28" width="4" height="8" rx="2" fill="#F4A261"/>
          <circle cx="36" cy="27" r="2" fill="#F4A261"/>
        </svg>
      </div>
      <h2>Tell us about your day</h2>
      <p>Fill in your preferences and we'll plan every meal — with a grocery list and cooking schedule.</p>
    </div>
  );
}
