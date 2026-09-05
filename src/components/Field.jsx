import { Icon } from './icons';

export function TextField({ label, required, ...rest }) {
  return (
    <div className={`il-field ${required ? 'il-field--required' : ''}`.trim()}>
      <label>{label}</label>
      <input className="il-input" {...rest} />
    </div>
  );
}

export function DisplayField({ label, children, mono = false }) {
  return (
    <div className="il-field">
      <label>{label}</label>
      <div className={`il-input il-input--display ${mono ? 'il-input--mono' : ''}`.trim()}>{children}</div>
    </div>
  );
}

export function SelectField({ label, children }) {
  return (
    <div className="il-field">
      <label>{label}</label>
      <div className="il-input il-input--display">
        <span>{children}</span>
        <Icon name="chevronDown" size={14} color="var(--il-ink-3)" strokeWidth={2} />
      </div>
    </div>
  );
}

export function MissingEvidenceField({ label = 'Evidencia adjunta', hint = 'Requerido para cerrar la no conformidad.' }) {
  return (
    <div className="il-field il-field--required">
      <label>{label}</label>
      <div className="il-input il-input--missing">Sin archivo</div>
      <span className="il-field__hint il-field__hint--danger">{hint}</span>
    </div>
  );
}
