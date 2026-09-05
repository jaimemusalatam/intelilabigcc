import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { NCTable } from '../components/NCTable';
import { StatusBadge } from '../components/Badge';
import { TextField, SelectField, DisplayField, MissingEvidenceField } from '../components/Field';
import { Button } from '../components/Button';
import { Icon } from '../components/icons';
import { NC_LIST, NC_ALERTS } from '../data/mock';

const CAPA_ROWS = [
  ['inmediata', 'Acción inmediata'],
  ['causa', 'Análisis de causa'],
  ['extension', 'Análisis de extensión'],
  ['accionCorrectiva', 'Acción correctiva'],
  ['eficacia', 'Evaluación de eficacia'],
  ['riesgos', 'Revisión de riesgos y cambios en el SGC'],
];

export default function NCCapa() {
  const [selected, setSelected] = useState(NC_LIST[0]);

  return (
    <>
      <PageHeader title="No conformidades y acciones correctivas" subtitle="NC / CAPA — ISO 15189 · Cláusula 7.5 – 8.7" />

      <div className="il-panel" style={{ flexDirection: 'row', gap: 32, alignItems: 'center' }}>
        <Metric label="Abiertas" value={NC_ALERTS.abiertas} color="var(--il-progreso)" />
        <Metric label="Vencidas" value={NC_ALERTS.vencidas} color="var(--il-no-cumplido)" />
        <Metric label="En progreso" value={NC_ALERTS.enProgreso} color="var(--il-progreso)" />
        <div style={{ flex: 1 }} />
        <Button variant="primary"><Icon name="plus" size={16} /> Registrar no conformidad</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, alignItems: 'start' }}>
        <NCTable items={NC_LIST} onRowClick={setSelected} hint="Filas de 48px, cabecera monoespaciada" />

        <div className="il-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="il-panel__title">{selected.id}</span>
            <StatusBadge status={selected.tag} label={selected.estado} />
          </div>

          <TextField label="Título de la no conformidad" defaultValue={selected.desc} readOnly />
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <SelectField label="Cláusula">{selected.clause} — {selected.proceso}</SelectField>
            </div>
            <div style={{ width: 150 }}>
              <DisplayField label="Fecha límite" mono>{selected.due}</DisplayField>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CAPA_ROWS.map(([key, label]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 0', borderBottom: '1px solid #EEF1F3' }}>
                <span className="il-text-small" style={{ fontWeight: 600, color: 'var(--il-ink)' }}>{label}</span>
                <span className="il-text-body">{selected[key]}</span>
              </div>
            ))}
          </div>

          {selected.tag !== 'cumplido' && <MissingEvidenceField />}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Button variant="ghost">Cancelar</Button>
            {selected.tag !== 'cumplido' && <Button variant="danger">Cerrar NC</Button>}
          </div>
        </div>
      </div>
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
