import { PageHeader } from '../components/PageHeader';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge, ClauseTag } from '../components/Badge';
import { Icon } from '../components/icons';
import { Button } from '../components/Button';
import { MANAGEMENT_REVIEW_INPUTS, MANAGEMENT_REVIEW_AGREEMENTS } from '../data/mock';

export default function ManagementReview() {
  return (
    <>
      <PageHeader title="Revisión por la Dirección" subtitle="ISO 15189 · Cláusula 8.9" />

      <section className="il-panel">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SectionHeader icon="personas">Entradas de la revisión</SectionHeader>
          <Button variant="primary"><Icon name="doc" size={16} /> Generar acta de revisión</Button>
        </div>
        <p className="il-text-body">
          El acta se genera importando automáticamente la información de cada entrada. Verifique el estado antes
          de emitirla.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {MANAGEMENT_REVIEW_INPUTS.map((entry) => (
            <div key={entry.key} style={{ border: '1px solid var(--il-border)', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name={entry.icon} size={20} color="var(--il-graphite-800)" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{entry.label}</span>
                <span className="il-text-small">{entry.resumen}</span>
              </div>
              <StatusBadge status={entry.estado} />
            </div>
          ))}
        </div>
      </section>

      <section className="il-panel">
        <SectionHeader icon="checkCircle">Acuerdos derivados de la revisión</SectionHeader>
        <div className="il-table-card">
          <div className="il-table-header-row" style={{ gridTemplateColumns: '120px 1fr 140px 110px 120px' }}>
            <span>Código</span><span>Decisión / acción</span><span>Responsable</span><span>Fecha</span><span>Estado</span>
          </div>
          {MANAGEMENT_REVIEW_AGREEMENTS.map((a) => (
            <div key={a.id} className="il-table-row" style={{ gridTemplateColumns: '120px 1fr 140px 110px 120px', cursor: 'default' }}>
              <ClauseTag>{a.id}</ClauseTag>
              <span>{a.decision}</span>
              <span className="il-text-small">{a.responsable}</span>
              <span className="il-text-meta">{a.fecha}</span>
              <StatusBadge status={a.estado} />
            </div>
          ))}
        </div>
        <p className="il-text-small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="reloj" size={14} />
          Brinda alerta sobre el cumplimiento de plazos de los acuerdos.
        </p>
      </section>
    </>
  );
}
