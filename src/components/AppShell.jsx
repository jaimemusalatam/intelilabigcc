import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';

function AppShellLayout({ sidebarTheme }) {
  const { isOpen, close } = useSidebar();
  return (
    <div className="il-app">
      <Sidebar theme={sidebarTheme} />
      {isOpen && <div className="il-sidebar-backdrop" onClick={close} />}
      <main className="il-main">
        <Outlet />
      </main>
    </div>
  );
}

export function AppShell({ sidebarTheme = 'graphite' }) {
  return (
    <SidebarProvider>
      <AppShellLayout sidebarTheme={sidebarTheme} />
    </SidebarProvider>
  );
}
