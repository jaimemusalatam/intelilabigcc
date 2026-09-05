import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './icons';
import { USER } from '../data/mock';
import { useAuth } from '../context/AuthContext';

export function PageHeader({ title, subtitle, alerts = 7 }) {
  const { logout, user } = useAuth();
  const displayUser = user ?? USER;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

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
      <div className="il-topbar__user-wrap" ref={menuRef}>
        <button className="il-topbar__user" onClick={() => setMenuOpen((v) => !v)}>
          <span className="il-topbar__avatar">{displayUser.initials}</span>
          <span className="il-text-body" style={{ color: 'var(--il-ink-2)' }}>{displayUser.name}</span>
          <Icon name="chevronDown" size={14} color="var(--il-ink-3)" strokeWidth={2} />
        </button>
        {menuOpen && (
          <div className="il-topbar__menu">
            <button className="il-topbar__menu-item" onClick={handleLogout}>
              <Icon name="x" size={15} strokeWidth={1.8} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
