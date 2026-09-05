import { Icon } from './icons';
import { USER } from '../data/mock';

export function PageHeader({ title, subtitle, alerts = 7 }) {
  return (
    <div className="il-topbar">
      <div className="il-topbar__titles">
        <span className="il-topbar__title">{title}</span>
        {subtitle && <span className="il-topbar__subtitle">{subtitle}</span>}
      </div>
      <div className="il-topbar__bell">
        <Icon name="campana" size={21} strokeWidth={1.5} />
        {alerts > 0 && <span className="il-topbar__bell-badge">{alerts}</span>}
      </div>
      <div className="il-topbar__divider" />
      <div className="il-topbar__user">
        <span className="il-topbar__avatar">{USER.initials}</span>
        <span className="il-text-body" style={{ color: 'var(--il-ink-2)' }}>{USER.name}</span>
        <Icon name="chevronDown" size={14} color="var(--il-ink-3)" strokeWidth={2} />
      </div>
    </div>
  );
}
