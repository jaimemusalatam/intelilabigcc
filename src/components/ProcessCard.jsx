import { Icon } from './icons';
import { StatusBadge, ClauseTag } from './Badge';
import { processStatus } from '../data/mock';

// Tarjeta de proceso tal como está documentada en el kit (04 Componentes):
// tres densidades — extendida, métrica, compacta.

export function ProcessCardExtendida({ icon, title, clause, percent, status, onClick }) {
  const st = status ?? 'no-aplica';
  return (
    <button className="il-process-card il-process-card--extendida" onClick={onClick}>
      <div className="il-process-card__top">
        <span className="il-process-card__icon">
          <Icon name={icon} size={20} />
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 0 }}>
          <span className="il-process-card__title">{title}</span>
          <ClauseTag>{clause}</ClauseTag>
        </div>
        <Icon name="chevronRight" size={16} color="var(--il-red)" strokeWidth={2} />
      </div>
      <div className="il-process-card__divider" />
      <div className="il-process-card__metric-row">
        <span className="il-ring-legend__dot" style={{ background: `var(--il-${st})` }} />
        <span className="il-process-card__metric">{percent}%</span>
        <span className="il-text-small">{st === 'cumplido' ? 'Cumplido' : st === 'progreso' ? 'En progreso' : 'No cumplido'}</span>
      </div>
    </button>
  );
}

export function ProcessCardMetrica({ icon, title, clause, percent, status, onClick }) {
  const st = status ?? 'no-aplica';
  return (
    <button className="il-process-card il-process-card--metrica" onClick={onClick}>
      <span className="il-process-card__go">
        <Icon name="chevronRight" size={12} color="var(--il-ink-3)" strokeWidth={2.4} />
      </span>
      <Icon name={icon} size={36} color={`var(--il-${st})`} strokeWidth={1.4} />
      <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.25 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: `var(--il-${st})` }}>{percent}%</div>
      <div className="il-bar-track" style={{ height: 4, width: '100%' }}>
        <div className={`il-bar-fill il-bar-fill--${st}`} style={{ width: `${percent}%` }} />
      </div>
      <ClauseTag>{clause}</ClauseTag>
    </button>
  );
}

export function ProcessCardCompacta({ icon, title, clause, percent, label, status, onClick }) {
  const st = status ?? 'no-aplica';
  const cls = `il-process-card il-process-card--compacta ${st === 'no-cumplido' ? 'il-process-card--no-cumplido' : ''}`;
  return (
    <button className={cls.trim()} onClick={onClick}>
      <Icon name={icon} size={22} color={st === 'no-cumplido' ? 'var(--il-red)' : 'var(--il-graphite-800)'} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{title}</span>
        <span className="il-text-meta" style={{ color: st === 'no-cumplido' ? 'var(--il-no-cumplido-fg)' : 'var(--il-ink-3)' }}>{clause}</span>
      </div>
      {label ? (
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--il-red)' }}>{label}</span>
      ) : (
        <StatusBadge status={st} label={`${percent}%`} className="il-badge--plain" />
      )}
    </button>
  );
}

// Tarjeta usada en el Mapa de Procesos (dashboard) — sigue la maqueta de
// referencia: ícono, título, cláusula, porcentaje y barra de color por umbral.
export function ProcessTile({ process, onClick }) {
  const status = processStatus(process);
  return (
    <button className="il-process-card il-process-tile" onClick={onClick}>
      <div className="il-process-tile__head">
        <span className="il-process-tile__icon">
          <Icon name={process.icon} size={22} color={`var(--il-${status ?? 'no-aplica'})`} strokeWidth={1.4} />
        </span>
        <Icon name="chevronRight" size={15} color="var(--il-ink-3)" strokeWidth={2} />
      </div>
      <div className="il-process-tile__title">{process.name}</div>
      {process.percent != null ? (
        <>
          <div className="il-process-tile__metric" style={{ color: `var(--il-${status})` }}>{process.percent}%</div>
          <div className="il-bar-track" style={{ height: 4 }}>
            <div className={`il-bar-fill il-bar-fill--${status}`} style={{ width: `${process.percent}%` }} />
          </div>
        </>
      ) : (
        <div className="il-process-tile__metric" style={{ color: `var(--il-${status})`, fontSize: 18 }}>{process.label}</div>
      )}
      <ClauseTag>ISO {process.clause}</ClauseTag>
    </button>
  );
}
