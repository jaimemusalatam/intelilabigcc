import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { SectionHeader } from '../components/SectionHeader';
import { Icon } from '../components/icons';

const FLOWS = [
  {
    title: 'Desde un equipo',
    steps: ['Equipo X (EQ-014)', 'Mantenimientos', 'Calibraciones', 'Métodos', 'Requisitos ISO'],
    to: '/procesos/equipos',
    ejemplo: 'El auditor pregunta: «Muéstreme la evidencia de mantenimiento del equipo X».',
  },
  {
    title: 'Desde un requisito ISO',
    steps: ['ISO 15189: 6.4', 'Proceso Equipos', 'Documentos', 'Equipos', 'Registros'],
    to: '/procesos/equipos',
  },
  {
    title: 'Desde un documento',
    steps: ['POE-LAB-005', 'Proceso', 'Requisitos ISO', 'Formatos', 'Evidencias', 'Responsables'],
    to: '/nc-capa',
  },
];

export default function Traceability() {
  const navigate = useNavigate();
  const [active, setActive] = useState(FLOWS[0]);

  return (
    <>
      <PageHeader title="Trazabilidad bidireccional" subtitle="Navega desde cualquier elemento hacia sus relaciones" />

      <div className="il-panel">
        <SectionHeader icon="link">Concepto central</SectionHeader>
        <p className="il-text-body">
          Requisito → Proceso → Responsable → Documento → Evidencia → Riesgo → Indicador → Alerta → Auditoría.
        </p>
        <p className="il-text-small">Cada información cargada tiene contexto y relación: InteliLab no es un repositorio de archivos aislados.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {FLOWS.map((flow) => (
          <button
            key={flow.title}
            className="il-panel"
            style={{ textAlign: 'left', cursor: 'pointer', border: active.title === flow.title ? '1px solid var(--il-red)' : undefined }}
            onClick={() => setActive(flow)}
          >
            <span className="il-panel__title">{flow.title}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              {flow.steps.map((s, i) => (
                <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="il-clause">{s}</span>
                  {i < flow.steps.length - 1 && <Icon name="chevronRight" size={14} color="var(--il-ink-3)" />}
                </span>
              ))}
            </div>
            {flow.ejemplo && <p className="il-text-small">{flow.ejemplo}</p>}
          </button>
        ))}
      </div>

      <div className="il-panel">
        <span className="il-panel__title">Ir al detalle relacionado</span>
        <p className="il-text-body">«{active.title}» te lleva al módulo donde se gestionan estas relaciones.</p>
        <button className="il-btn il-btn--primary" style={{ alignSelf: 'flex-start' }} onClick={() => navigate(active.to)}>
          Abrir módulo <Icon name="arrowRight" size={16} color="#fff" />
        </button>
      </div>
    </>
  );
}
