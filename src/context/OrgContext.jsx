import { createContext, useContext, useMemo, useState } from 'react';
import { useLocalCollection } from '../lib/storage';
import { ORG_TREE_SEED } from '../data/org';

const OrgContext = createContext(null);

export function OrgProvider({ children }) {
  const { items, setItems } = useLocalCollection('org-tree', ORG_TREE_SEED);
  const tree = Array.isArray(items) ? ORG_TREE_SEED : items;

  const [sedeId, setSedeId] = useState(() => {
    try {
      return localStorage.getItem('il-active-sede') ?? tree.sedes[0]?.id;
    } catch {
      return tree.sedes[0]?.id;
    }
  });

  const setSede = (id) => {
    setSedeId(id);
    try {
      localStorage.setItem('il-active-sede', id);
    } catch {
      /* almacenamiento no disponible */
    }
  };

  const addSede = (name) => {
    setItems((prev) => ({
      ...prev,
      sedes: [...prev.sedes, { id: `sede-${Date.now()}`, name, areas: [] }],
    }));
  };

  const addArea = (targetSedeId, name) => {
    setItems((prev) => ({
      ...prev,
      sedes: prev.sedes.map((s) =>
        s.id === targetSedeId ? { ...s, areas: [...s.areas, { id: `area-${Date.now()}`, name }] } : s
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
