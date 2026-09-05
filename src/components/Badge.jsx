const LABELS = {
  cumplido: 'Cumplido',
  progreso: 'En progreso',
  'no-cumplido': 'No cumplido',
  'no-aplica': 'No aplica',
};

export function StatusBadge({ status, label, className = '' }) {
  const variant = status ?? 'no-aplica';
  return (
    <span className={`il-badge il-badge--${variant} ${className}`.trim()}>
      <span className="il-badge__dot" />
      {label ?? LABELS[variant] ?? 'No aplica'}
    </span>
  );
}

export function CountBadge({ children, className = '' }) {
  return <span className={`il-badge il-badge--count ${className}`.trim()}>{children}</span>;
}

export function ClauseTag({ children, className = '' }) {
  return <span className={`il-clause ${className}`.trim()}>{children}</span>;
}

export function statusLabel(status) {
  return LABELS[status] ?? 'No aplica';
}

export function statusColor(status) {
  switch (status) {
    case 'cumplido':
      return 'var(--il-cumplido)';
    case 'progreso':
      return 'var(--il-progreso)';
    case 'no-cumplido':
      return 'var(--il-no-cumplido)';
    default:
      return 'var(--il-no-aplica)';
  }
}
