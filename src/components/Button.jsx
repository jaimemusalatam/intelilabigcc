import { Icon } from './icons';

const VARIANT_CLASS = {
  primary: 'il-btn--primary',
  secondary: 'il-btn--secondary',
  ghost: 'il-btn--ghost',
  danger: 'il-btn--danger',
};

export function Button({ variant = 'primary', children, className = '', ...rest }) {
  const cls = `il-btn ${VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary} ${className}`.trim();
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function AuditModeButton({ compact = false, onClick, className = '' }) {
  return (
    <button className={`il-btn il-btn--audit ${className}`.trim()} onClick={onClick}>
      <Icon name="escudoCheck" size={22} color="#fff" strokeWidth={1.6} />
      <span className="il-btn__lines">
        <strong>MODO AUDITORÍA</strong>
        {!compact && <span>Acceso rápido</span>}
      </span>
      <Icon name="chevronRight" size={18} color="#fff" strokeWidth={2} style={{ marginLeft: 4 }} />
    </button>
  );
}
