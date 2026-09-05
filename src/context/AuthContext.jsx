import { createContext, useContext, useMemo, useState } from 'react';
import { AUTH_CREDENTIALS, USER } from '../data/mock';

const AuthContext = createContext(null);
const STORAGE_KEY = 'il-auth-session';

function isValidSession(value) {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof value.email === 'string' &&
    typeof value.name === 'string' &&
    typeof value.initials === 'string'
  );
}

function readStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isValidSession(parsed)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredSession);

  const login = (email, password) => {
    const normalized = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    if (normalized !== AUTH_CREDENTIALS.email || normalizedPassword !== AUTH_CREDENTIALS.password) {
      return { ok: false, error: 'Correo o contraseña incorrectos.' };
    }
    const session = { name: USER.name, initials: USER.initials, role: USER.role, email: AUTH_CREDENTIALS.email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, isAuthenticated: !!user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
