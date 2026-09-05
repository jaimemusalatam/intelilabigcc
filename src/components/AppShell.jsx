import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AppShell({ sidebarTheme = 'graphite' }) {
  return (
    <div className="il-app">
      <Sidebar theme={sidebarTheme} />
      <main className="il-main">
        <Outlet />
      </main>
    </div>
  );
}
