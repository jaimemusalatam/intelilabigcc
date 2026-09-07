import { createContext, useContext, useMemo } from 'react';
import { makeId, usePersistedState, useLocalCollection } from '../lib/storage';
import { ORG_TREE_SEED } from '../data/org';

const OrgContext = createContext(null);

export function OrgProvider({ children }) {
  const { items: tree, setItems } = useLocalCollection('org-tree', ORG_TREE_SEED);
  const [sedeId, setSede] = usePersistedState('il-active-sede', tree.sedes[0]?.id);

  const addSede = (name) => {
    setItems((prev) => ({
      ...prev,
      sedes: [...prev.sedes, { id: makeId('sede'), name, areas: [] }],
    }));
  };

  const addArea = (targetSedeId, name) => {
    setItems((prev) => ({
      ...prev,
      sedes: prev.sedes.map((s) =>
        s.id === targetSedeId ? { ...s, areas: [...s.areas, { id: makeId('area'), name }] } : s
      ),
    }));
  };

  const value = useMemo(
    () => ({
      org: tree,
      sedeId,
      sede: tree.sedes.find((s) => s.id === sedeId) ?? tree.sedes[0],
      setSede,
      addSede,
      addArea,
    }),
    [tree, sedeId]
  );

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

export function useOrg() {
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error('useOrg debe usarse dentro de <OrgProvider>');
  return ctx;
}
