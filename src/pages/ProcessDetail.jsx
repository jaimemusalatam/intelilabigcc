import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Tabs } from '../components/Tabs';
import { StatusBadge, ClauseTag } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Icon } from '../components/icons';
import { Button } from '../components/Button';
import { findProcess, processStatus, requirementsFor, INDICATORS } from '../data/mock';

const TABS = ['Resumen', 'Requisitos', 'Documentos', 'Formatos y registros', 'Historial'];

const DOCS = [
  { nombre: 'Procedimiento — Control del proceso', tipo: 'Procedimiento', estado: 'Vigente', version: 'v3.1' },
  { nombre: 'Política asociada', tipo: 'Política', estado: 'Vigente', version: 'v1.0' },
  { nombre: 'Instructivo de operación', tipo: 'Instructivo', estado: 'Vigente', version: 'v2.0' },
  { nombre: 'Manual de referencia (versión anterior)', tipo: 'Manual', estado: 'Obsoleto', version: 'v1.2' },
];

const REGISTROS = [
  { nombre: 'Formato de registro vigente', tipo: 'Formato', estado: 'Vigente' },
  { nombre: 'Registro completado — periodo actual', tipo: 'Registro', estado: 'Vigente' },
  { nombre: 'Evidencia fotográfica de verificación', tipo: 'Evidencia', estado: 'Vigente' },
];

const HISTORIAL = [
  { usuario: 'M. Quispe', fecha: '20/05/2026 10:30', accion: 'Actualizó porcentaje de cumplimiento' },
  { usuario: 'C. Torres', fecha: '12/05/2026 16:05', accion: 'Cargó evidencia de mantenimiento' },
  { usuario: 'L. Ramos', fecha: '02/05/2026 09:12', accion: 'Registró responsable del requisito' },
];

export default function ProcessDetail() {
  const { processId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Resumen');
  const process = findProcess(processId);

  if (!process) {
    return (
      <>
        <PageHeader title="Proceso no encontrado" />
        <div className="il-card">
          <p className="il-text-body">No existe un proceso con el identificador «{processId}».</p>
          <Button variant="secondary" onClick={() => navigate('/')}>Volver al mapa de procesos</Button>
        </div>
      </>
    );
  }

  const status = processStatus(process);
  const requirements = requirementsFor(processId);
  const indicators = INDICATORS.filter((i) => i.proceso === process.name);

  return (
    <>
      <PageHeader title={process.name} subtitle={`ISO 15189 · Cláusula ${process.clause}`} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        <div className="il-panel">
          <Tabs tabs={TABS} active={tab} onChange={setTab} />

          {tab === 'Resumen' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p className="il-text-body">
                Gestiona la información, responsables y evidencia relacionados con {process.name.toLowerCase()},
                conforme a la cláusula {process.clause} de ISO 15189:2022.
              </p>
              <div style={{ display: 'flex', gap: 24 }}>
                <div>
                  <div className="il-text-metric" style={{ color: `var(--il-${status ?? 'no-aplica'})` }}>
                    {process.percent != null ? `${process.percent}%` : process.label}
                  </div>
                  <span className="il-text-small">Implementación</span>
                </div>
                <div>
                  <div className="il-text-metric">{process.alerts}</div>
                  <span className="il-text-small">Alertas pendientes</span>
                </div>
              </div>
              {indicators.length > 0 && (
                <div>
                  <div className="il-text-section" style={{ color: 'var(--il-ink-2)', marginBottom: 10 }}>Indicadores principales</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {indicators.map((i) => (
                      <ProgressBar key={i.id} label={i.nombre} percent={Math.round((i.actual / i.meta) * 100)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'Requisitos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {requirements.map((r) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #EEF1F3' }}>
                  <ClauseTag>{r.id}</ClauseTag>
                  <span style={{ flex: 1, fontSize: 14 }}>{r.desc}</span>
                  <span className="il-text-small">{r.responsable}</span>
                  <StatusBadge status={r.estado} />
                </div>
              ))}
            </div>
          )}

          {tab === 'Documentos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="secondary"><Icon name="upload" size={16} /> Subir documento</Button>
              </div>
              {DOCS.map((d) => (
                <DocRow key={d.nombre} doc={d} />
              ))}
            </div>
          )}

          {tab === 'Formatos y registros' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <Button variant="secondary"><Icon name="upload" size={16} /> Subir</Button>
                <Button variant="primary"><Icon name="plus" size={16} /> Generar registro</Button>
              </div>
              {REGISTROS.map((d) => (
                <DocRow key={d.nombre} doc={d} />
              ))}
            </div>
          )}

          {tab === 'Historial' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {HISTORIAL.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid #EEF1F3', fontSize: 13 }}>
                  <span className="il-text-meta" style={{ width: 140 }}>{h.fecha}</span>
                  <span style={{ width: 90, color: 'var(--il-ink-2)' }}>{h.usuario}</span>
                  <span style={{ flex: 1 }}>{h.accion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="il-panel">
          <span className="il-panel__title">Trazabilidad</span>
          <p className="il-text-small">
            Requisito → Proceso → Responsable → Documento → Evidencia → Riesgo → Indicador → Alerta → Auditoría.
          </p>
          <Button variant="secondary" onClick={() => navigate('/modo-auditoria')}>
            <Icon name="escudo" size={16} /> Ver en Modo Auditoría
          </Button>
        </div>
      </div>
    </>
  );
}

function DocRow({ doc }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #EEF1F3' }}>
      <Icon name="file" size={18} color="var(--il-ink-2)" />
      <span style={{ flex: 1, fontSize: 14 }}>{doc.nombre}</span>
      <span className="il-text-small">{doc.tipo}</span>
      {doc.version && <span className="il-text-meta">{doc.version}</span>}
      <StatusBadge status={doc.estado === 'Vigente' ? 'cumplido' : 'no-aplica'} label={doc.estado} />
    </div>
  );
}
