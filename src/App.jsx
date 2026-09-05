import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import Dashboard from './pages/Dashboard';
import ProcessDetail from './pages/ProcessDetail';
import AuditMode from './pages/AuditMode';
import Indicators from './pages/Indicators';
import NCCapa from './pages/NCCapa';
import Audits from './pages/Audits';
import ManagementReview from './pages/ManagementReview';
import Kit from './pages/Kit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/kit" element={<Kit />} />

        <Route element={<AppShell sidebarTheme="graphite" />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/procesos/:processId" element={<ProcessDetail />} />
          <Route path="/modo-auditoria" element={<AuditMode />} />
          <Route path="/indicadores" element={<Indicators />} />
          <Route path="/nc-capa" element={<NCCapa />} />
          <Route path="/auditorias" element={<Audits />} />
        </Route>

        <Route element={<AppShell sidebarTheme="light" />}>
          <Route path="/revision-direccion" element={<ManagementReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
