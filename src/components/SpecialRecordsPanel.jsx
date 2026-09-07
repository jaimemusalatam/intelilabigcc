import { useState } from 'react';
import { StatusBadge } from './Badge';
import { Button } from './Button';
import { Icon } from './icons';
import { LJChart } from './LJChart';
import { LJ_SERIES } from '../data/specialRecords';
import { useLocalCollection, logAction, makeId } from '../lib/storage';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';

const ESTADO_STATUS = {
  vigente: 'cumplido', firmado: 'cumplido', aprobado: 'cumplido', operativo: 'cumplido', completada: 'cumplido',
  cumple: 'cumplido', ejecutado: 'cumplido', controlado: 'cumplido', cerrado: 'cumplido', cerrada: 'cumplido',
  'bajo control': 'cumplido',
  programado: 'progreso', programada: 'progreso', pendiente: 'progreso', 'en progreso': 'progreso', 'en tratamiento': 'progreso',
  'en revision': 'progreso', 'en evaluacion': 'progreso', 'proxima a vencer': 'progreso', planificada: 'progreso', estimada: 'progreso',
  vencido: 'no-cumplido', vencida: 'no-cumplido', obsoleto: 'no-aplica', abierto: 'no-cumplido', 'fuera de meta': 'no-cumplido',
  'fuera de servicio': 'no-cumplido', 'evaluacion vencida': 'no-cumplido', 'fuera de control': 'no-cumplido',
};

function statusFor(value) {
  return ESTADO_STATUS[String(value ?? '').toLowerCase()] ?? null;
}

export function SpecialRecordsBlock({ processId, block }) {
  const { user } = useAuth();
  const { can } = useRole();
  const storageKey = `special:${processId}:${block.key}`;
  const { items, add } = useLocalCollection(storageKey, block.seed);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({});

  const canCreate = block.roleGroup ? can(block.roleGroup, 'crear') : true;

  const handleAdd = (e) => {
    e.preventDefault();
    const entry = { id: makeId(block.key), ...draft };
    add(entry);
    logAction({
      usuario: user?.name ?? 'Usuario',
      accion: `Registró un elemento en «${block.title}»`,
      elemento: processId,
      valorNuevo: JSON.stringify(draft),
    });
    setDraft({});
    setShowForm(false);
  };

  return (
    <div className="il-panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span className="il-panel__title">{block.title}</span>
        {canCreate && (
          <Button variant="secondary" onClick={() => setShowForm((v) => !v)}>
            <Icon name="plus" size={15} /> Registrar
          </Button>
        )}
      </div>
      {block.note && (
        <p className="il-text-small" style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
          <Icon name="info" size={14} style={{ flex: 'none', marginTop: 2 }} />
          {block.note}
        </p>
      )}

      {showForm && (
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(block.addFields.length, 3)}, 1fr)`, gap: 10, padding: '10px 0', borderBottom: '1px solid #EEF1F3' }}>
          {block.addFields.map((f) => (
            <div className="il-field" key={f.key}>
              <label>{f.label}</label>
              <input
                className="il-input"
                value={draft[f.key] ?? ''}
                onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                required
              />
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button type="submit" variant="primary">Guardar</Button>
          </div>
        </form>
      )}

      <div className="il-table-card" style={{ overflowX: 'auto' }}>
        <div className="il-table-header-row" style={{ gridTemplateColumns: `repeat(${block.columns.length}, minmax(110px, 1fr))` }}>
          {block.columns.map((c) => <span key={c.key}>{c.label}</span>)}
        </div>
        {items.length === 0 && <p className="il-text-body" style={{ padding: '16px 20px' }}>Sin registros todavía.</p>}
        {items.map((row) => (
          <div key={row.id} className="il-table-row" style={{ gridTemplateColumns: `repeat(${block.columns.length}, minmax(110px, 1fr))`, cursor: 'default' }}>
            {block.columns.map((c) =>
              c.key === 'estado' ? (
                <span key={c.key}><StatusBadge status={statusFor(row[c.key])} label={row[c.key]} /></span>
              ) : (
                <span key={c.key}>{row[c.key] ?? '—'}</span>
              )
            )}
          </div>
        ))}
      </div>

      {block.key === 'control-interno-calidad' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {items.filter((row) => LJ_SERIES[row.id]).map((row) => (
            <LJChart key={row.id} prueba={row.prueba} {...LJ_SERIES[row.id]} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SpecialRecordsPanel({ processId, blocks }) {
  if (!blocks || blocks.length === 0) {
    return <p className="il-text-body">Este módulo no tiene registros especializados adicionales; usa las pestañas de Documentos y Formatos y registros.</p>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {blocks.map((b) => (
        <SpecialRecordsBlock key={b.key} processId={processId} block={b} />
      ))}
    </div>
  );
}
