import { createContext, useContext, useMemo, useState } from 'react';
import { ROLES, canRole, findRole } from '../data/roles';

const RoleContext = createContext(null);
const STORAGE_KEY = 'il-active-role';

export function RoleProvider({ children }) {
  const [roleId, setRoleId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? 'calidad';
    } catch {
      return 'calidad';
    }
  });

  const setRole = (id) => {
    setRoleId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* almacenamiento no disponible */
    }
  };

  const value = useMemo(
    () => ({
      role: findRole(roleId),
      roleId,
      roles: ROLES,
      setRole,
      can: (group, action) => canRole(roleId, group, action),
    }),
    [roleId]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole debe usarse dentro de <RoleProvider>');
  return ctx;
}
