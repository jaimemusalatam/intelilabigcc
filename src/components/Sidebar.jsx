import { NavLink } from 'react-router-dom';
import { Icon } from './icons';
import { NAV_ITEMS } from '../data/mock';

export function Sidebar({ theme = 'graphite' }) {
  const isLight = theme === 'light';
  return (
    <aside className={`il-sidebar il-sidebar--${theme}`}>
      <div className="il-sidebar__brand">
        <svg width="26" height="29" viewBox="0 0 42 46" fill="none" stroke={isLight ? 'var(--il-red)' : '#fff'} strokeWidth="2.4" strokeLinejoin="round">
          <path d="M21 2.5 38.5 12v22L21 43.5 3.5 34V12z" />
          <path d="M14.5 30.5 27 15.5" strokeLinecap="round" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span className="il-sidebar__brand-name">InteliLab</span>
          <span className="il-sidebar__brand-suffix">IGCC</span>
        </div>
      </div>

      <nav className="il-sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `il-navitem il-navitem--${theme} ${isActive ? 'il-navitem--active' : ''}`.trim()
            }
          >
            <Icon name={item.icon} size={19} strokeWidth={1.5} />
            <span className="il-navitem__label">{item.label}</span>
            {item.badge ? <span className="il-navitem__badge">{item.badge}</span> : null}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/modo-auditoria" className="il-sidebar__audit-cta">
        <strong>{isLight ? 'MODO AUDITORÍA' : 'IR A MODO AUDITORÍA'}</strong>
        {!isLight && <span>Accede a evidencias, listas de verificación y trazabilidad completa.</span>}
      </NavLink>
    </aside>
  );
}
