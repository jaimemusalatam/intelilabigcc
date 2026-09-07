import { PageHeader } from '../components/PageHeader';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import { Icon } from '../components/icons';
import { ALL_PROCESSES, NC_LIST, AUDITS, INDICATORS } from '../data/mock';
import { buildCentralAlerts, rowsForBlock } from '../data/kpis';
import { downloadCSV } from '../lib/exports';
import { logAction } from '../lib/storage';
import { useAuth } from '../context/AuthContext';

function buildReport(key) {
  switch (key) {
    case 'matriz-iso':
      return { filename: 'matriz-iso', rows: ALL_PROCESSES, columns: [{ key: 'name', label: 'Proceso' }, { key: 'clause', label: 'Cláusula ISO' }, { key: 'percent', label: '% cumplimiento' }, { key: 'alerts', label: 'Alertas' }] };
    case 'estado-cumplimiento':
      return { filename: 'estado-cumplimiento', rows: ALL_PROCESSES.map((p) => ({ ...p, estado: p.estado ?? (p.percent >= 90 ? 'Cumplido' : p.percent >= 70 ? 'En progreso' : 'No cumplido') })), columns: [{ key: 'name', label: 'Proceso' }, { key: 'estado', label: 'Estado' }, { key: 'percent', label: '%' }] };
    case 'equipos':
      return { filename: 'equipos', rows: rowsForBlock('listado-equipos'), columns: [{ key: 'codigo', label: 'Código' }, { key: 'nombre', label: 'Equipo' }, { key: 'ubicacion', label: 'Ubicación' }, { key: 'estado', label: 'Estado' }] };
    case 'mantenimientos':
      return { filename: 'mantenimientos', rows: rowsForBlock('mantenimiento'), columns: [{ key: 'equipo', label: 'Equipo' }, { key: 'tipo', label: 'Tipo' }, { key: 'proximo', label: 'Próximo' }, { key: 'estado', label: 'Estado' }] };
    case 'calibraciones':
      return { filename: 'calibraciones', rows: rowsForBlock('calibracion'), columns: [{ key: 'equipo', label: 'Equipo' }, { key: 'patron', label: 'Patrón' }, { key: 'proxima', label: 'Próxima' }, { key: 'estado', label: 'Estado' }] };
    case 'capacitaciones':
      return { filename: 'capacitaciones', rows: rowsForBlock('capacitacion'), columns: [{ key: 'tema', label: 'Tema' }, { key: 'responsable', label: 'Responsable' }, { key: 'fecha', label: 'Fecha' }, { key: 'estado', label: 'Estado' }] };
    case 'competencias':
      return { filename: 'competencias', rows: rowsForBlock('competencia'), columns: [{ key: 'persona', label: 'Persona' }, { key: 'competencia', label: 'Competencia' }, { key: 'vigencia', label: 'Vigente hasta' }, { key: 'estado', label: 'Estado' }] };
    case 'riesgos':
      return { filename: 'riesgos', rows: rowsForBlock('matriz-riesgos'), columns: [{ key: 'proceso', label: 'Proceso' }, { key: 'riesgo', label: 'Riesgo' }, { key: 'nivel', label: 'Nivel' }, { key: 'estado', label: 'Estado' }] };
    case 'nc':
      return { filename: 'no-conformidades', rows: NC_LIST, columns: [{ key: 'id', label: 'ID' }, { key: 'proceso', label: 'Proceso' }, { key: 'desc', label: 'Descripción' }, { key: 'estado', label: 'Estado' }, { key: 'due', label: 'Fecha límite' }] };
    case 'acciones':
      return { filename: 'acciones-correctivas', rows: NC_LIST, columns: [{ key: 'id', label: 'NC' }, { key: 'accionCorrectiva', label: 'Acción correctiva' }, { key: 'eficacia', label: 'Evaluación de eficacia' }] };
    case 'auditorias':
      return { filename: 'auditorias', rows: AUDITS, columns: [{ key: 'id', label: 'Código' }, { key: 'tipo', label: 'Tipo' }, { key: 'alcance', label: 'Alcance' }, { key: 'fecha', label: 'Fecha' }, { key: 'estado', label: 'Estado' }] };
    case 'indicadores':
      return { filename: 'indicadores', rows: INDICATORS, columns: [{ key: 'id', label: 'ID' }, { key: 'nombre', label: 'Indicador' }, { key: 'meta', label: 'Meta' }, { key: 'actual', label: 'Actual' }, { key: 'estado', label: 'Estado' }] };
    case 'actividades-vencidas':
      return { filename: 'actividades-vencidas', rows: buildCentralAlerts().filter((a) => a.estado === 'no-cumplido'), columns: [{ key: 'proceso', label: 'Proceso' }, { key: 'tipo', label: 'Origen' }, { key: 'descripcion', label: 'Descripción' }] };
    default:
      return { filename: key, rows: [], columns: [] };
  }
}

const REPORTS = [
  { key: 'matriz-iso', label: 'Matriz ISO' },
  { key: 'estado-cumplimiento', label: 'Estado de cumplimiento' },
  { key: 'equipos', label: 'Equipos' },
  { key: 'mantenimientos', label: 'Mantenimientos' },
  { key: 'calibraciones', label: 'Calibraciones' },
  { key: 'capacitaciones', label: 'Capacitaciones' },
  { key: 'competencias', label: 'Competencias' },
  { key: 'riesgos', label: 'Riesgos' },
  { key: 'nc', label: 'No conformidades' },
  { key: 'acciones', label: 'Acciones correctivas' },
  { key: 'auditorias', label: 'Auditorías' },
  { key: 'indicadores', label: 'Indicadores' },
  { key: 'actividades-vencidas', label: 'Actividades vencidas' },
];

export default function Reports() {
  const { user } = useAuth();

  const handleExportCSV = (key, label) => {
    const { filename, rows, columns } = buildReport(key);
    downloadCSV(filename, rows, columns);
    logAction({ usuario: user?.name ?? 'Usuario', accion: `Exportó el reporte «${label}» (Excel/CSV)`, elemento: 'Reportes' });
  };

  const handlePrint = (label) => {
    logAction({ usuario: user?.name ?? 'Usuario', accion: `Exportó el reporte «${label}» (PDF)`, elemento: 'Reportes' });
    window.print();
  };

  return (
    <>
      <PageHeader title="Reportes" subtitle="Exportación de la información de la plataforma en PDF y Excel" />

      <section className="il-panel il-no-print">
        <SectionHeader icon="download">Reportes prioritarios</SectionHeader>
        <p className="il-text-small">Cada reporte se exporta como CSV (compatible con Excel) o como PDF mediante la vista de impresión del navegador.</p>
        <div className="il-table-card">
          <div className="il-table-header-row" style={{ gridTemplateColumns: '1fr 140px 140px' }}>
            <span>Reporte</span><span>Excel</span><span>PDF</span>
          </div>
          {REPORTS.map((r) => (
            <div key={r.key} className="il-table-row" style={{ gridTemplateColumns: '1fr 140px 140px', cursor: 'default' }}>
              <span style={{ fontWeight: 600 }}>{r.label}</span>
              <Button variant="secondary" onClick={() => handleExportCSV(r.key, r.label)}><Icon name="download" size={14} /> Excel</Button>
              <Button variant="secondary" onClick={() => handlePrint(r.label)}><Icon name="file" size={14} /> PDF</Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
