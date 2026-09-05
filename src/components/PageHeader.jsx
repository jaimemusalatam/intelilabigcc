import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './icons';
import { GlobalSearch } from './GlobalSearch';
import { USER } from '../data/mock';
import { buildCentralAlerts } from '../data/kpis';
import { useLocalCollection } from '../lib/storage';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { useOrg } from '../context/OrgContext';

export function PageHeader({ title, subtitle }) {
  const { logout, user } = useAuth();
  const displayUser = user ?? USER;
  const navigate = useNavigate();
  const { toggle: toggleSidebar } = useSidebar();
  const { sede } = useOrg();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  const alerts = useMemo(() => buildCentralAlerts(), []);
  const { items: dismissed, add: dismiss } = useLocalCollection('notifications-dismissed', []);
  const pending = alerts.filter((a) => !dismissed.some((d) => d.id === a.id));

  useEffect(() => {
    if (!menuOpen && !notifOpen) return;
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (notifOpen && notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, notifOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="il-topbar">
      <button
        type="button"
        className="il-topbar__menu-toggle"
        aria-label="Abrir menú de navegación"
        onClick={toggleSidebar}
      >
        <Icon name="menu" size={21} strokeWidth={1.8} />
      </button>
      <div className="il-topbar__titles">
        <span className="il-topbar__title">{title}</span>
        {subtitle && <span className="il-topbar__subtitle">{subtitle}</span>}
      </div>

      <button type="button" className="il-topbar__search" aria-label="Buscar en toda la plataforma" onClick={() => setSearchOpen(true)}>
        <Icon name="lupa" size={19} strokeWidth={1.6} />
      </button>

      <div className="il-topbar__user-wrap" ref={notifRef}>
        <button
          type="button"
          className="il-topbar__bell"
          aria-label={pending.length > 0 ? `Notificaciones, ${pending.length} sin leer` : 'Notificaciones'}
          onClick={() => setNotifOpen((v) => !v)}
        >
          <Icon name="campana" size={21} strokeWidth={1.5} />
          {pending.length > 0 && <span className="il-topbar__bell-badge" aria-hidden="true">{pending.length}</span>}
        </button>
        {notifOpen && (
          <div className="il-topbar__menu" style={{ minWidth: 320, maxHeight: 360, overflowY: 'auto' }}>
            <div className="il-topbar__menu-header">
              <strong>Notificaciones</strong>
              <span className="il-text-small">{pending.length} pendientes de la Central de Alertas</span>
            </div>
            {pending.length === 0 && <p className="il-text-small" style={{ padding: '10px 4px' }}>Sin notificaciones nuevas.</p>}
            {pending.slice(0, 8).map((a) => (
              <div key={a.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '8px 4px', borderBottom: '1px solid #EEF1F3' }}>
                <Icon name="alerta" size={14} color="var(--il-no-cumplido)" style={{ marginTop: 2, flex: 'none' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{a.proceso}</div>
                  <div className="il-text-small">{a.descripcion}</div>
                </div>
                <button className="il-btn il-btn--ghost" style={{ height: 24, padding: '0 6px', fontSize: 11 }} onClick={() => dismiss({ id: a.id })}>
                  Marcar leído
                </button>
              </div>
            ))}
            <button
              className="il-topbar__menu-item"
              onClick={() => { setNotifOpen(false); navigate('/alertas'); }}
            >
              <Icon name="arrowRight" size={15} strokeWidth={1.8} />
              <span>Ver Central de Alertas</span>
            </button>
          </div>
        )}
      </div>

      <div className="il-topbar__divider" />
      <div className="il-topbar__user-wrap" ref={menuRef}>
        <button className="il-topbar__user" onClick={() => setMenuOpen((v) => !v)}>
          <span className="il-topbar__avatar">{displayUser.initials}</span>
          <span className="il-text-body" style={{ color: 'var(--il-ink-2)' }}>{displayUser.name}</span>
          <Icon name="chevronDown" size={14} color="var(--il-ink-3)" strokeWidth={2} />
        </button>
        {menuOpen && (
          <div className="il-topbar__menu">
            <div className="il-topbar__menu-header">
              <strong>{displayUser.name}</strong>
              <span className="il-text-small">{displayUser.role} · {sede?.name}</span>
            </div>
            <button className="il-topbar__menu-item" style={{ color: 'var(--il-ink)' }} onClick={() => { setMenuOpen(false); navigate('/configuracion'); }}>
              <Icon name="config" size={15} strokeWidth={1.8} />
              <span>Configuración</span>
            </button>
            <button className="il-topbar__menu-item" onClick={handleLogout}>
              <Icon name="x" size={15} strokeWidth={1.8} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>

      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
