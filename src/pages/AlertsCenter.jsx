import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/Badge';
import { Icon } from '../components/icons';
import { buildCentralAlerts } from '../data/kpis';

export default function AlertsCenter() {
  const navigate = useNavigate();
  const alerts = useMemo(() => buildCentralAlerts(), []);
  const [tipo, setTipo] = useState('Todos');

  const tipos = ['Todos', ...Array.from(new Set(alerts.map((a) => a.tipo)))];
  const filtered = tipo === 'Todos' ? alerts : alerts.filter((a) => a.tipo === tipo);
  const vencidas = alerts.filter((a) => a.estado === 'no-cumplido').length;

  return (
    <>
      <PageHeader title="Central de Alertas" subtitle="Entidad única que centraliza alertas por proceso y requisito de la norma" />

      <div className="il-panel" style={{ flexDirection: 'row', gap: 32, alignItems: 'center' }}>
        <Metric label="Alertas activas" value={alerts.length} />
        <Metric label="Vencidas / críticas" value={vencidas} color="var(--il-no-cumplido)" />
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tipos.map((t) => (
            <button
              key={t}
              onClick={() => setTipo(t)}
              className="il-badge"
              style={{
                border: '1px solid ' + (tipo === t ? 'var(--il-red)' : 'var(--il-border)'),
                background: tipo === t ? 'var(--il-red-soft)' : 'var(--il-surface)',
                color: tipo === t ? 'var(--il-no-cumplido-fg)' : 'var(--il-ink-2)',
                cursor: 'pointer',
                height: 30,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <section className="il-panel">
        <SectionHeader icon="campana">Alertas</SectionHeader>
        <div className="il-table-card">
          <div className="il-table-header-row" style={{ gridTemplateColumns: '160px 150px 1fr 120px' }}>
            <span>Proceso</span><span>Origen</span><span>Descripción</span><span>Estado</span>
          </div>
          {filtered.length === 0 && <p className="il-text-body" style={{ padding: '18px 20px' }}>Sin alertas para este filtro.</p>}
          {filtered.map((a) => (
            <button key={a.id} className="il-table-row" style={{ gridTemplateColumns: '160px 150px 1fr 120px', display: 'grid' }} onClick={() => navigate(a.to)}>
              <span style={{ fontWeight: 600 }}>{a.proceso}</span>
              <span className="il-text-small">{a.tipo}</span>
              <span>{a.descripcion}</span>
              <StatusBadge status={a.estado} />
            </button>
          ))}
        </div>
        <p className="il-text-small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="info" size={14} /> No existen sistemas de alertas independientes por módulo: esta central agrupa todas las alertas de la plataforma.
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
