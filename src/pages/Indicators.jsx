import { PageHeader } from '../components/PageHeader';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge, ClauseTag } from '../components/Badge';
import { Icon } from '../components/icons';
import { Button } from '../components/Button';
import { INDICATORS } from '../data/mock';

export default function Indicators() {
  const cumplidos = INDICATORS.filter((i) => i.estado === 'cumplido').length;
  const incumplidos = INDICATORS.filter((i) => i.estado !== 'cumplido').length;

  return (
    <>
      <PageHeader title="Indicadores" subtitle="Reporte, análisis y acción sobre los procesos" />

      <div className="il-panel" style={{ flexDirection: 'row', gap: 32, alignItems: 'center' }}>
        <Metric label="Indicadores registrados" value={INDICATORS.length} />
        <Metric label="Dentro de meta" value={cumplidos} color="var(--il-cumplido)" />
        <Metric label="Fuera de meta" value={incumplidos} color="var(--il-no-cumplido)" />
        <div style={{ flex: 1 }} />
        <Button variant="primary"><Icon name="plus" size={16} /> Registrar indicador</Button>
      </div>

      <section className="il-panel">
        <SectionHeader icon="barras">Tablero de indicadores</SectionHeader>
        <div className="il-table-card">
          <div className="il-table-header-row" style={{ gridTemplateColumns: '90px 1fr 160px 100px 100px 130px' }}>
            <span>ID</span><span>Indicador</span><span>Proceso</span><span>Meta</span><span>Actual</span><span>Estado</span>
          </div>
          {INDICATORS.map((i) => (
            <div key={i.id} className="il-table-row" style={{ gridTemplateColumns: '90px 1fr 160px 100px 100px 130px', cursor: 'default' }}>
              <ClauseTag>{i.id}</ClauseTag>
              <span>{i.nombre}</span>
              <span className="il-text-small">{i.proceso}</span>
              <span className="il-text-meta">{i.meta}{i.unidad}</span>
              <span className="il-text-meta" style={{ fontWeight: 700, color: 'var(--il-ink)' }}>{i.actual}{i.unidad}</span>
              <StatusBadge status={i.estado} />
            </div>
          ))}
        </div>
        <p className="il-text-small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="alerta" size={14} color="var(--il-no-cumplido)" />
          Los indicadores fuera de meta generan alerta automática en la Central de Alertas.
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
