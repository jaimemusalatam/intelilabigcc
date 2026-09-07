import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { SectionHeader } from '../components/SectionHeader';
import { ProcessTile } from '../components/ProcessCard';
import { ComplianceRing, ComplianceRingLegend } from '../components/ComplianceRing';
import { Icon } from '../components/icons';
import { AuditModeButton } from '../components/Button';
import { PROCESS_GROUPS, COMPLIANCE_SUMMARY } from '../data/mock';
import { dashboardKpis } from '../data/kpis';

const QUICK_LINKS = [
  { label: 'Indicadores', icon: 'barras', to: '/indicadores' },
  { label: 'Documentos', icon: 'doc', to: '/procesos/documental' },
  { label: 'Auditorías', icon: 'portapapeles', to: '/auditorias' },
  { label: 'Revisión Dirección', icon: 'personas', to: '/revision-direccion' },
  { label: 'Central de Alertas', icon: 'campana', to: '/alertas' },
  { label: 'Reportes', icon: 'download', to: '/reportes' },
];

const KPI_TILES = [
  { key: 'actividadesVencidas', label: 'Actividades vencidas', icon: 'alerta', color: 'var(--il-no-cumplido)' },
  { key: 'actividadesProximas', label: 'Actividades próximas', icon: 'reloj', color: 'var(--il-progreso)' },
  { key: 'ncAbiertas', label: 'No conformidades abiertas', icon: 'alerta', color: 'var(--il-no-cumplido)' },
  { key: 'documentosPorRevisar', label: 'Documentos por revisar', icon: 'doc', color: 'var(--il-progreso)' },
  { key: 'competenciasVencidas', label: 'Competencias vencidas', icon: 'personas', color: 'var(--il-no-cumplido)' },
  { key: 'mantenimientosVencidos', label: 'Mantenimientos vencidos', icon: 'monitor', color: 'var(--il-no-cumplido)' },
  { key: 'calibracionesVencidas', label: 'Calibraciones vencidas', icon: 'diana', color: 'var(--il-no-cumplido)' },
  { key: 'eqaPendientes', label: 'EQA pendientes', icon: 'medalla', color: 'var(--il-progreso)' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const kpis = useMemo(() => dashboardKpis(), []);

  return (
    <>
      <PageHeader title="Mapa de Procesos ISO 15189:2022" subtitle="Sistema inteligente para gestión y cumplimiento" />

      <div className="il-panel">
        <span className="il-panel__title">KPI generales</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
          {KPI_TILES.map((k) => (
            <div key={k.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name={k.icon} size={18} color={k.color} strokeWidth={1.8} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 20, fontWeight: 700 }}>{kpis[k.key]}</span>
                <span className="il-text-small">{k.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {PROCESS_GROUPS.map((group) => (
            <section key={group.key} className="il-panel">
              <SectionHeader icon={group.icon}>{group.title}</SectionHeader>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(group.processes.length, 6)}, 1fr)`,
                  gap: 16,
                }}
              >
                {group.processes.map((p) => (
                  <ProcessTile key={p.id} process={p} onClick={() => navigate(`/procesos/${p.id}`)} />
                ))}
              </div>
            </section>
          ))}
          <p className="il-text-small" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="info" size={16} />
            Haz clic en cualquier tarjeta para ver el detalle del proceso, requisitos, evidencias y acciones relacionadas.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="il-panel">
            <span className="il-panel__title">Cumplimiento general</span>
            <div className="il-ring-wrap">
              <ComplianceRing
                percent={COMPLIANCE_SUMMARY.percent}
                cumplidos={COMPLIANCE_SUMMARY.cumplidos}
                progreso={COMPLIANCE_SUMMARY.progreso}
                noCumplidos={COMPLIANCE_SUMMARY.noCumplidos}
              />
              <ComplianceRingLegend
                cumplidos={COMPLIANCE_SUMMARY.cumplidos}
                progreso={COMPLIANCE_SUMMARY.progreso}
                noCumplidos={COMPLIANCE_SUMMARY.noCumplidos}
              />
            </div>
            <div className="il-text-small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="reloj" size={14} />
              Última actualización: {COMPLIANCE_SUMMARY.actualizado}
            </div>
          </div>

          <div className="il-panel">
            <span className="il-panel__title">Resumen de evaluación</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <SummaryRow icon="checkCircle" color="var(--il-cumplido)" label="Cumplidos" value={COMPLIANCE_SUMMARY.cumplidos} pct={70} />
              <SummaryRow icon="clockCircle" color="var(--il-progreso)" label="En progreso" value={COMPLIANCE_SUMMARY.progreso} pct={24} />
              <SummaryRow icon="xCircle" color="var(--il-no-cumplido)" label="No cumplidos" value={COMPLIANCE_SUMMARY.noCumplidos} pct={6} />
              <div style={{ display: 'flex', alignItems: 'center', padding: '13px 0 2px' }}>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>Total de requisitos</span>
                <span style={{ fontSize: 17, fontWeight: 700 }}>{COMPLIANCE_SUMMARY.total}</span>
              </div>
            </div>
          </div>

          <div className="il-panel">
            <span className="il-panel__title">Accesos rápidos</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {QUICK_LINKS.map((q) => (
                <button
                  key={q.label}
                  onClick={() => navigate(q.to)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--il-ink-2)', fontFamily: 'inherit' }}
                >
                  <Icon name={q.icon} size={20} />
                  <span style={{ fontSize: 12, textAlign: 'center' }}>{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ border: '1px solid var(--il-red-border)', background: 'var(--il-red-soft)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>¿Listo para una auditoría?</div>
            <div className="il-text-body">Active el Modo Auditoría para una visión completa y la evidencia organizada por cláusula.</div>
            <AuditModeButton compact onClick={() => navigate('/modo-auditoria')} />
          </div>
        </div>
      </div>
    </>
  );
}

function SummaryRow({ icon, color, label, value, pct }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', borderBottom: '1px solid #EEF1F3' }}>
      <Icon name={icon} size={17} color={color} strokeWidth={1.8} />
      <span style={{ flex: 1, fontSize: 13, color: 'var(--il-ink-2)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, width: 34, textAlign: 'right' }}>{value}</span>
      <span className="il-text-meta" style={{ width: 42, textAlign: 'right' }}>{pct}%</span>
    </div>
  );
}
