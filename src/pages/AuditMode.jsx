import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/icons';
import { StatusBadge, ClauseTag } from '../components/Badge';
import { buildSearchIndex, searchByCategory } from '../lib/searchIndex';

const CATEGORIES = [
  { key: 'requisito', label: 'Requisito ISO', icon: 'portapapeles' },
  { key: 'proceso', label: 'Proceso', icon: 'capas' },
  { key: 'equipo', label: 'Equipo', icon: 'monitor' },
  { key: 'metodo', label: 'Método', icon: 'microscopio' },
  { key: 'persona', label: 'Persona', icon: 'personas' },
  { key: 'documento', label: 'Documento', icon: 'doc' },
];

const TRAZABILIDAD_EJEMPLOS = [
  { desde: 'Desde un equipo', ruta: 'Equipo X → mantenimientos → calibraciones → métodos → requisitos ISO' },
  { desde: 'Desde un requisito ISO', ruta: '6.4 → proceso Equipos → documentos → equipos → registros' },
  { desde: 'Desde un documento', ruta: 'POE-LAB-005 → proceso → requisitos ISO → formatos → evidencias → responsables' },
];

export default function AuditMode() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('requisito');
  const index = useMemo(() => buildSearchIndex(), []);

  const results = useMemo(() => searchByCategory(index, category, query), [index, category, query]);

  return (
    <>
      <div style={{ background: 'var(--il-graphite-800)', borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Icon name="escudoCheck" size={26} color="#fff" strokeWidth={1.6} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Modo Auditoría</span>
          <span style={{ color: '#C6CDD4', fontSize: 13 }}>Evidencia organizada por cláusula, lista para responder cualquier pregunta del auditor.</span>
        </div>
      </div>

      <div className="il-panel">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className="il-badge"
              style={{
                border: '1px solid ' + (category === c.key ? 'var(--il-red)' : 'var(--il-border)'),
                background: category === c.key ? 'var(--il-red-soft)' : 'var(--il-surface)',
                color: category === c.key ? 'var(--il-no-cumplido-fg)' : 'var(--il-ink-2)',
                cursor: 'pointer',
                height: 34,
              }}
            >
              <Icon name={c.icon} size={15} />
              {c.label}
            </button>
          ))}
        </div>
        <div className="il-input" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48 }}>
          <Icon name="lupa" size={18} color="var(--il-ink-3)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar por ${CATEGORIES.find((c) => c.key === category)?.label.toLowerCase()}… p. ej. "micropipeta"`}
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14, fontFamily: 'inherit' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
        <div className="il-table-card">
          <div className="il-table-card__head">
            <span className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Resultados</span>
            <span className="il-text-small">{results.length} coincidencias</span>
          </div>
          {results.length === 0 && (
            <p className="il-text-body" style={{ padding: '18px 20px' }}>Sin resultados para esta búsqueda.</p>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.label}-${i}`}
              className="il-table-row"
              style={{ gridTemplateColumns: '150px 1fr 130px', display: 'grid' }}
              onClick={() => navigate(r.to)}
            >
              <ClauseTag>{r.type}</ClauseTag>
              <span>{r.label}</span>
              <span className="il-text-small">{r.meta ?? '—'}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="il-panel">
            <span className="il-panel__title">Vista por requisito · ISO 15189: 6.4</span>
            <VistaRow label="Estado" value={<StatusBadge status="progreso" />} />
            <VistaRow label="Responsable" value="M. Quispe" />
            <VistaRow label="Documentos" value="3 vigentes" />
            <VistaRow label="Equipos" value="12 registrados" />
            <VistaRow label="Registros" value="48 este año" />
          </div>

          <div className="il-panel">
            <span className="il-panel__title">Trazabilidad bidireccional</span>
            {TRAZABILIDAD_EJEMPLOS.map((t) => (
              <div key={t.desde} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span className="il-text-small" style={{ fontWeight: 600, color: 'var(--il-ink)' }}>{t.desde}</span>
                <span className="il-text-meta">{t.ruta}</span>
              </div>
            ))}
            <button className="il-btn il-btn--ghost" style={{ alignSelf: 'flex-start' }} onClick={() => navigate('/trazabilidad')}>
              Ver explorador completo <Icon name="arrowRight" size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function VistaRow({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #EEF1F3' }}>
      <span style={{ flex: 1, fontSize: 13, color: 'var(--il-ink-2)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600 }}>{value}</span>
    </div>
  );
}
