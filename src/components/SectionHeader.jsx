import { Icon } from './icons';

export function SectionHeader({ icon, children }) {
  return (
    <div className="il-section-header">
      <span className="il-section-header__icon">
        <Icon name={icon} size={17} color="var(--il-red)" strokeWidth={1.6} />
      </span>
      <span className="il-section-header__label">{children}</span>
    </div>
  );
}
