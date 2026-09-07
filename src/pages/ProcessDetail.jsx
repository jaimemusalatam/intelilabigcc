import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Tabs } from '../components/Tabs';
import { StatusBadge, ClauseTag } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Icon } from '../components/icons';
import { Button } from '../components/Button';
import { SpecialRecordsPanel } from '../components/SpecialRecordsPanel';
import { findProcess, processStatus, requirementsFor, INDICATORS } from '../data/mock';
import { specialRecordsFor } from '../data/specialRecords';
import { useLocalCollection, logAction, useAuditLog, makeId } from '../lib/storage';
import { useAuth } from '../context/AuthContext';

const DOCS_SEED = [
  { id: 'doc-1', nombre: 'Procedimiento — Control del proceso', tipo: 'Procedimiento', estado: 'Vigente', version: 'v3.1' },
  { id: 'doc-2', nombre: 'Política asociada', tipo: 'Política', estado: 'Vigente', version: 'v1.0' },
  { id: 'doc-3', nombre: 'Instructivo de operación', tipo: 'Instructivo', estado: 'Vigente', version: 'v2.0' },
  { id: 'doc-4', nombre: 'Manual de referencia (versión anterior)', tipo: 'Manual', estado: 'Obsoleto', version: 'v1.2' },
];

const REGISTROS_SEED = [
  { id: 'reg-1', nombre: 'Formato de registro vigente', tipo: 'Formato', estado: 'Vigente' },
  { id: 'reg-2', nombre: 'Registro completado — periodo actual', tipo: 'Registro', estado: 'Vigente' },
  { id: 'reg-3', nombre: 'Evidencia fotográfica de verificación', tipo: 'Evidencia', estado: 'Vigente' },
];

const HISTORIAL_SEED = [
  { usuario: 'M. Quispe', fecha: '20/05/2026', hora: '10:30', accion: 'Actualizó porcentaje de cumplimiento' },
  { usuario: 'C. Torres', fecha: '12/05/2026', hora: '16:05', accion: 'Cargó evidencia de mantenimiento' },
  { usuario: 'L. Ramos', fecha: '02/05/2026', hora: '09:12', accion: 'Registró responsable del requisito' },
];

export default function ProcessDetail() {
  const { processId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const process = findProcess(processId);
  const extras = specialRecordsFor(processId);
  const tabs = ['Resumen', 'Requisitos', 'Documentos', 'Formatos y registros', ...(extras.length ? ['Registros especiales'] : []), 'Historial'];
  const [tab, setTab] = useState('Resumen');

  const docs = useLocalCollection(`process-docs:${processId}`, DOCS_SEED);
  const registros = useLocalCollection(`process-registros:${processId}`, REGISTROS_SEED);
  const auditLog = useAuditLog();
  const docInputRef = useRef(null);
  const regInputRef = useRef(null);

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

  const handleUpload = (collection, file) => {
    if (!file) return;
    collection.add({ id: makeId('f'), nombre: file.name, tipo: 'Documento', estado: 'Vigente', version: 'v1.0' });
    logAction({ usuario: user?.name ?? 'Usuario', accion: `Subió el documento «${file.name}»`, elemento: process.name });
  };

  const handleGenerateRecord = () => {
    const nombre = window.prompt('Nombre del registro a generar:');
    if (!nombre) return;
    registros.add({ id: makeId('r'), nombre, tipo: 'Registro', estado: 'Vigente' });
    logAction({ usuario: user?.name ?? 'Usuario', accion: `Generó el registro «${nombre}»`, elemento: process.name });
  };

  const historial = [
    ...auditLog.filter((h) => h.elemento === process.name).map((h) => ({ usuario: h.usuario, fecha: h.fecha, hora: h.hora, accion: h.accion })),
    ...HISTORIAL_SEED,
  ];

  return (
    <>
      <PageHeader title={process.name} subtitle={`ISO 15189 · Cláusula ${process.clause}`} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        <div className="il-panel">
          <Tabs tabs={tabs} active={tab} onChange={setTab} />

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
                <input ref={docInputRef} type="file" hidden onChange={(e) => handleUpload(docs, e.target.files[0])} />
                <Button variant="secondary" onClick={() => docInputRef.current?.click()}><Icon name="upload" size={16} /> Subir documento</Button>
              </div>
              {docs.items.map((d) => (
                <DocRow key={d.id} doc={d} />
              ))}
            </div>
          )}

          {tab === 'Formatos y registros' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <input ref={regInputRef} type="file" hidden onChange={(e) => handleUpload(registros, e.target.files[0])} />
                <Button variant="secondary" onClick={() => regInputRef.current?.click()}><Icon name="upload" size={16} /> Subir</Button>
                <Button variant="primary" onClick={handleGenerateRecord}><Icon name="plus" size={16} /> Generar registro</Button>
              </div>
              {registros.items.map((d) => (
                <DocRow key={d.id} doc={d} />
              ))}
            </div>
          )}

          {tab === 'Registros especiales' && <SpecialRecordsPanel processId={processId} blocks={extras} />}

          {tab === 'Historial' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {historial.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid #EEF1F3', fontSize: 13 }}>
                  <span className="il-text-meta" style={{ width: 150 }}>{h.fecha} {h.hora}</span>
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
          <Button variant="secondary" onClick={() => navigate('/trazabilidad')}>
            <Icon name="link" size={16} /> Explorar relaciones
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
