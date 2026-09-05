import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import Dashboard from './pages/Dashboard';
import ProcessDetail from './pages/ProcessDetail';
import AuditMode from './pages/AuditMode';
import Indicators from './pages/Indicators';
import NCCapa from './pages/NCCapa';
import Audits from './pages/Audits';
import ManagementReview from './pages/ManagementReview';
import AlertsCenter from './pages/AlertsCenter';
import Reports from './pages/Reports';
import Traceability from './pages/Traceability';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import { OrgProvider } from './context/OrgContext';
import { seedAuditLog } from './lib/storage';
import { AUDIT_LOG_SEED } from './data/auditLogSeed';

export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

export default function App() {
  useEffect(() => {
    seedAuditLog(AUDIT_LOG_SEED);
  }, []);

  return (
    <AuthProvider>
      <RoleProvider>
        <OrgProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route element={<RequireAuth><AppShell sidebarTheme="graphite" /></RequireAuth>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/procesos/:processId" element={<ProcessDetail />} />
                <Route path="/modo-auditoria" element={<AuditMode />} />
                <Route path="/indicadores" element={<Indicators />} />
                <Route path="/nc-capa" element={<NCCapa />} />
                <Route path="/auditorias" element={<Audits />} />
                <Route path="/alertas" element={<AlertsCenter />} />
                <Route path="/reportes" element={<Reports />} />
                <Route path="/trazabilidad" element={<Traceability />} />
                <Route path="/configuracion" element={<Settings />} />
              </Route>

              <Route element={<RequireAuth><AppShell sidebarTheme="light" /></RequireAuth>}>
                <Route path="/revision-direccion" element={<ManagementReview />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </OrgProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
