import { useState } from 'react';

export default function TodoChecklist({ tasks }) {
  const [done, setDone] = useState(() => new Array(tasks.length).fill(false));

  function toggle(i) {
    setDone((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  const doneCount = done.filter(Boolean).length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div>
      <div className="progress-bar-wrapper">
        <div className="progress-label">
          <span>{doneCount} of {tasks.length} tasks done</span>
          <span>{pct}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="todo-list">
        {tasks.map((task, i) => (
          <div
            key={i}
            className={`todo-item ${done[i] ? 'done' : ''}`}
            onClick={() => toggle(i)}
          >
            <div className="todo-checkbox">
              {done[i] && <span>✓</span>}
            </div>
            <span className="todo-time-badge">{task.time}</span>
            <span className="todo-task">{task.task}</span>
            <span className="todo-duration">{task.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
