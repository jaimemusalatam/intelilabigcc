import { createContext, useContext, useMemo, useState } from 'react';

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      toggle: () => setIsOpen((v) => !v),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar debe usarse dentro de <SidebarProvider>');
  return ctx;
}
