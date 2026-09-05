import { statusFromPercent } from '../data/mock';

export function ProgressBar({ label, percent, showValue = true }) {
  const status = statusFromPercent(percent) ?? 'no-aplica';
  return (
    <div className="il-bar-row">
      {label && (
        <div className="il-bar-row__labels">
          <span style={{ color: 'var(--il-ink-2)' }}>{label}</span>
          {showValue && <span style={{ fontWeight: 700 }}>{percent}%</span>}
        </div>
      )}
      <div className="il-bar-track">
        <div
          className={`il-bar-fill il-bar-fill--${status}`}
          style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        />
      </div>
    </div>
  );
}
