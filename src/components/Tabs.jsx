export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="il-tabs">
      {tabs.map((t) => (
        <button
          key={t}
          className={`il-tab ${t === active ? 'il-tab--active' : ''}`.trim()}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
