import { createContext, useContext, useMemo } from 'react';
import { usePersistedState } from '../lib/storage';
import { ROLES, canRole, findRole } from '../data/roles';

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [roleId, setRole] = usePersistedState('il-active-role', 'calidad');

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
