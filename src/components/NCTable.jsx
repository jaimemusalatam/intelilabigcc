import { StatusBadge } from './Badge';

const COLUMNS = '118px 1fr 130px 108px 110px';

const TAG_LABEL = {
  cumplido: 'Cerrada',
  progreso: 'En progreso',
  'no-cumplido': 'Vencida',
};

export function NCTable({ items, onRowClick, title = 'Tabla — No conformidades', hint }) {
  return (
    <div className="il-table-card">
      <div className="il-table-card__head">
        <span className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>{title}</span>
        {hint && <span className="il-text-small">{hint}</span>}
      </div>
      <div className="il-table-header-row" style={{ gridTemplateColumns: COLUMNS }}>
        <span>Código</span><span>Descripción</span><span>Responsable</span><span>Vence</span><span>Estado</span>
      </div>
      {items.map((r) => (
        <button
          key={r.id}
          className="il-table-row"
          style={{ gridTemplateColumns: COLUMNS }}
          onClick={() => onRowClick?.(r)}
        >
          <span className="il-text-meta" style={{ color: 'var(--il-ink-2)' }}>{r.id}</span>
          <span style={{ color: 'var(--il-ink)' }}>{r.desc}</span>
          <span style={{ color: 'var(--il-ink-2)' }}>{r.resp}</span>
          <span className="il-text-meta" style={{ color: 'var(--il-ink-2)' }}>{r.due}</span>
          <StatusBadge status={r.tag} label={r.estado ?? TAG_LABEL[r.tag]} />
        </button>
      ))}
    </div>
  );
}
