import { PageHeader } from '../components/PageHeader';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge, ClauseTag } from '../components/Badge';
import { Icon } from '../components/icons';
import { Button } from '../components/Button';
import { AUDITS, AUDIT_SUMMARY } from '../data/mock';

const ESTADO_TO_STATUS = { Completada: 'cumplido', Planificada: 'progreso' };

export default function Audits() {
  return (
    <>
      <PageHeader title="Auditorías" subtitle="Planificación, ejecución y reporte de auditorías" />

      <div className="il-panel" style={{ flexDirection: 'row', gap: 32, alignItems: 'center' }}>
        <Metric label="Planificadas" value={AUDIT_SUMMARY.planificadas} color="var(--il-progreso)" />
        <Metric label="Completadas" value={AUDIT_SUMMARY.completadas} color="var(--il-cumplido)" />
        <Metric label="Cumplimiento del programa" value={`${AUDIT_SUMMARY.cumplimientoPrograma}%`} />
        <div style={{ flex: 1 }} />
        <Button variant="primary"><Icon name="calendario" size={16} /> Programar auditoría</Button>
      </div>

      <section className="il-panel">
        <SectionHeader icon="portapapeles">Programa de auditorías</SectionHeader>
        <div className="il-table-card">
          <div className="il-table-header-row" style={{ gridTemplateColumns: '130px 90px 1fr 130px 110px 120px 90px' }}>
            <span>Código</span><span>Tipo</span><span>Alcance</span><span>Responsable</span><span>Fecha</span><span>Estado</span><span>Hallazgos</span>
          </div>
          {AUDITS.map((a) => (
            <div key={a.id} className="il-table-row" style={{ gridTemplateColumns: '130px 90px 1fr 130px 110px 120px 90px', cursor: 'default' }}>
              <ClauseTag>{a.id}</ClauseTag>
              <span className="il-text-small">{a.tipo}</span>
              <span>{a.alcance}</span>
              <span className="il-text-small">{a.responsable}</span>
              <span className="il-text-meta">{a.fecha}</span>
              <StatusBadge status={ESTADO_TO_STATUS[a.estado]} label={a.estado} />
              <span style={{ fontWeight: 600 }}>{a.hallazgos ?? '—'}</span>
            </div>
          ))}
        </div>
        <p className="il-text-small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="reloj" size={14} />
          Genera alarma de cumplimiento cuando una auditoría planificada se acerca a su fecha límite.
        </p>
      </section>
    </>
  );
}

function Metric({ label, value, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="il-text-metric" style={{ fontSize: 24, color: color ?? 'var(--il-ink)' }}>{value}</span>
      <span className="il-text-small">{label}</span>
    </div>
  );
}
