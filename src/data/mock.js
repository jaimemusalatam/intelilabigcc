// Datos de referencia para InteliLab IGCC.
// Combinan las dos capturas de la maqueta original (sidebar grafito y sidebar
// claro) y la especificación funcional (PLATAFORMA DEL INTELILAB ISO 15189 —
// PROPUESTA). No son datos reales de ningún laboratorio.

export const ORG = {
  name: 'Laboratorio Clínico Referencia S.A.',
  sede: 'Sede Lima',
  norma: 'ISO 15189:2022',
  actualizado: 'Hoy, 09:30 a. m.',
};

export const USER = { name: 'Usuario', initials: 'JP', role: 'Responsable de calidad' };

// ---------------------------------------------------------------------------
// Mapa de procesos
// ---------------------------------------------------------------------------

export const PROCESS_GROUPS = [
  {
    key: 'estrategicos',
    title: '1. Procesos estratégicos',
    icon: 'diana',
    processes: [
      { id: 'direccion', name: 'Dirección y Gobierno', clause: '4 – 5', icon: 'edificio', percent: 96, alerts: 0 },
      { id: 'imparcialidad', name: 'Imparcialidad y Confidencialidad', clause: '4.1 – 4.2', icon: 'escudo', percent: 100, alerts: 0 },
      { id: 'riesgos', name: 'Riesgos y Oportunidades', clause: '6.1', icon: 'alerta', percent: 84, alerts: 2 },
      { id: 'documental', name: 'Gestión Documental', clause: '8.3 – 8.4', icon: 'doc', percent: 93, alerts: 1 },
      { id: 'mejora', name: 'Mejora', clause: '8.6', icon: 'tendencia', percent: 88, alerts: 0 },
    ],
  },
  {
    key: 'operativos',
    title: '2. Procesos operativos',
    icon: 'config',
    processes: [
      { id: 'preanalitico', name: 'Preanalítico', clause: '7.2', icon: 'matraz', percent: 95, alerts: 0 },
      { id: 'analitico', name: 'Analítico', clause: '7.3', icon: 'microscopio', percent: 82, alerts: 3 },
      { id: 'postanalitico', name: 'Postanalítico', clause: '7.4', icon: 'portapapeles', percent: 94, alerts: 0 },
    ],
  },
  {
    key: 'soporte',
    title: '3. Procesos de soporte',
    icon: 'personas',
    processes: [
      { id: 'personal', name: 'Personal', clause: '6.2', icon: 'personas', percent: 91, alerts: 4 },
      { id: 'instalaciones', name: 'Instalaciones', clause: '6.3', icon: 'edificio', percent: 97, alerts: 0 },
      { id: 'equipos', name: 'Equipos y Metrología', clause: '6.4 – 6.5', icon: 'monitor', percent: 74, alerts: 3 },
      { id: 'reactivos', name: 'Reactivos', clause: '6.6', icon: 'matraz', percent: 96, alerts: 0 },
      { id: 'proveedores', name: 'Proveedores', clause: '6.7 – 6.8', icon: 'manos', percent: 91, alerts: 2 },
      { id: 'ti', name: 'Tecnología de Información', clause: '7.6', icon: 'monitor', percent: 95, alerts: 0 },
    ],
  },
  {
    key: 'evaluacion',
    title: '4. Evaluación y mejora',
    icon: 'medalla',
    processes: [
      { id: 'indicadores', name: 'Indicadores', clause: '8.8', icon: 'barras', percent: 85, alerts: 1 },
      { id: 'nc-capa', name: 'NC / CAPA', clause: '7.5 – 8.7', icon: 'alerta', percent: null, estado: 'no-cumplido', label: '3 vencidas', alerts: 3 },
      { id: 'auditorias', name: 'Auditorías', clause: '8.8', icon: 'portapapeles', percent: 92, alerts: 0 },
      { id: 'revision-direccion', name: 'Revisión Dirección', clause: '8.9', icon: 'personas', percent: null, estado: 'cumplido', label: 'Cumplido', alerts: 0 },
    ],
  },
];

export const ALL_PROCESSES = PROCESS_GROUPS.flatMap((g) => g.processes);

export function findProcess(id) {
  return ALL_PROCESSES.find((p) => p.id === id) ?? null;
}

export function statusFromPercent(percent) {
  if (percent == null) return null;
  if (percent >= 90) return 'cumplido';
  if (percent >= 70) return 'progreso';
  return 'no-cumplido';
}

export function processStatus(process) {
  return process.estado ?? statusFromPercent(process.percent);
}

// ---------------------------------------------------------------------------
// Cumplimiento general (anillo)
// ---------------------------------------------------------------------------

export const COMPLIANCE_SUMMARY = {
  percent: 89,
  total: 92,
  cumplidos: 64,
  progreso: 22,
  noCumplidos: 6,
  actualizado: '20/05/2026 10:30',
};

// ---------------------------------------------------------------------------
// Navegación
// ---------------------------------------------------------------------------

export const NAV_ITEMS = [
  { to: '/', label: 'Mapa de Procesos', icon: 'capas' },
  { to: '/indicadores', label: 'Indicadores', icon: 'barras' },
  { to: '/nc-capa', label: 'NC / CAPA', icon: 'alerta', badge: 3 },
  { to: '/auditorias', label: 'Auditorías', icon: 'portapapeles' },
  { to: '/revision-direccion', label: 'Revisión Dirección', icon: 'personas' },
  { to: '/kit', label: 'Sistema de diseño', icon: 'config' },
];

// ---------------------------------------------------------------------------
// Requisitos por proceso (para Detalle de proceso)
// ---------------------------------------------------------------------------

export const REQUIREMENTS_BY_PROCESS = {
  equipos: [
    { id: '6.4.1', desc: 'Programa de mantenimiento preventivo documentado', responsable: 'C. Torres', estado: 'cumplido', evidencia: 'PROG-EQ-014' },
    { id: '6.4.4', desc: 'Calibración con trazabilidad metrológica vigente', responsable: 'M. Quispe', estado: 'progreso', evidencia: 'CERT-CAL-088' },
    { id: '6.4.6', desc: 'Registro de fuera de servicio y reincorporación', responsable: 'L. Ramos', estado: 'no-cumplido', evidencia: 'Sin evidencia' },
    { id: '6.5.1', desc: 'Verificación de la trazabilidad de resultados', responsable: 'A. Núñez', estado: 'cumplido', evidencia: 'VER-2026-021' },
  ],
  'nc-capa': [
    { id: '7.5.1', desc: 'Identificación y control de trabajo no conforme', responsable: 'M. Quispe', estado: 'progreso', evidencia: 'POE-LAB-005' },
    { id: '8.7.1', desc: 'Análisis de causa raíz de no conformidades', responsable: 'L. Ramos', estado: 'no-cumplido', evidencia: 'Sin evidencia' },
    { id: '8.7.2', desc: 'Evaluación de eficacia de acciones correctivas', responsable: 'C. Torres', estado: 'progreso', evidencia: 'EF-2026-004' },
  ],
  analitico: [
    { id: '7.3.1', desc: 'Verificación de métodos de examen antes de su uso', responsable: 'A. Núñez', estado: 'cumplido', evidencia: 'VER-MET-032' },
    { id: '7.3.2', desc: 'Control interno de calidad — reglas de control', responsable: 'M. Quispe', estado: 'progreso', evidencia: 'LJ-2026-Q2' },
    { id: '7.3.3', desc: 'Participación en evaluación externa de la calidad', responsable: 'L. Ramos', estado: 'cumplido', evidencia: 'EQA-2026-01' },
  ],
};

export function requirementsFor(processId) {
  return (
    REQUIREMENTS_BY_PROCESS[processId] ?? [
      { id: '—', desc: 'Requisitos por documentar para este proceso', responsable: '—', estado: 'progreso', evidencia: 'Sin evidencia' },
    ]
  );
}

// ---------------------------------------------------------------------------
// No conformidades / CAPA
// ---------------------------------------------------------------------------

export const NC_LIST = [
  {
    id: 'NC-2026-011', proceso: 'Equipos y Metrología', clause: '6.4.6',
    desc: 'Calibración de pipetas fuera de plazo', resp: 'M. Quispe', due: '02/09/2026',
    estado: 'Vencida', tag: 'no-cumplido',
    inmediata: 'Retiro de pipetas del servicio hasta recalibración.',
    causa: 'Falla en la alerta automática del programa de calibración.',
    extension: 'Se revisaron 6 equipos adicionales del mismo lote; sin hallazgos.',
    accionCorrectiva: 'Reprogramar alertas con doble verificación mensual.',
    eficacia: 'Pendiente — evaluación programada 15/11/2026.',
    riesgos: 'Actualizar matriz de riesgos de equipos críticos.',
  },
  {
    id: 'NC-2026-012', proceso: 'Instalaciones', clause: '6.3.2',
    desc: 'Registro de temperatura incompleto', resp: 'L. Ramos', due: '18/09/2026',
    estado: 'En progreso', tag: 'progreso',
    inmediata: 'Registro manual temporal mientras se repara el sensor.',
    causa: 'Sensor de temperatura del refrigerador R-04 con falla intermitente.',
    extension: 'No aplica a otros refrigeradores.',
    accionCorrectiva: 'Reemplazo del sensor y prueba de estabilidad 72 h.',
    eficacia: 'Pendiente',
    riesgos: 'Sin cambios en el SGC.',
  },
  {
    id: 'NC-2026-013', proceso: 'Analítico', clause: '7.3.2',
    desc: 'Falta firma en informe de validación', resp: 'C. Torres', due: '30/09/2026',
    estado: 'En progreso', tag: 'progreso',
    inmediata: 'Informe retenido, no se libera hasta firma.',
    causa: 'Omisión en el flujo de aprobación documental.',
    extension: 'Revisión de informes del último trimestre en curso.',
    accionCorrectiva: 'Bloqueo de descarga hasta firma electrónica en el sistema.',
    eficacia: 'Pendiente',
    riesgos: 'Sin cambios en el SGC.',
  },
  {
    id: 'NC-2026-010', proceso: 'Reactivos', clause: '6.6.3',
    desc: 'Rotulado de reactivos sin lote visible', resp: 'A. Núñez', due: '25/08/2026',
    estado: 'Cerrada', tag: 'cumplido',
    inmediata: 'Re-rotulado inmediato del lote observado.',
    causa: 'Etiqueta de proveedor con impresión defectuosa.',
    extension: 'Se verificó todo el stock del mismo proveedor.',
    accionCorrectiva: 'Rotulado interno adicional al recepcionar reactivos.',
    eficacia: 'Verificada 10/09/2026 — sin recurrencia.',
    riesgos: 'Cerrado sin cambios adicionales.',
  },
];

export const NC_ALERTS = {
  abiertas: NC_LIST.filter((n) => n.estado !== 'Cerrada').length,
  vencidas: NC_LIST.filter((n) => n.estado === 'Vencida').length,
  enProgreso: NC_LIST.filter((n) => n.estado === 'En progreso').length,
};

// ---------------------------------------------------------------------------
// Indicadores
// ---------------------------------------------------------------------------

export const INDICATORS = [
  { id: 'IND-01', nombre: 'Tiempo de respuesta de valores críticos', proceso: 'Postanalítico', clause: '7.4', meta: 30, actual: 24, unidad: 'min', estado: 'cumplido' },
  { id: 'IND-02', nombre: 'Rechazo de muestras preanalíticas', proceso: 'Preanalítico', clause: '7.2', meta: 2, actual: 1.4, unidad: '%', estado: 'cumplido' },
  { id: 'IND-03', nombre: 'Repeticiones de control interno de calidad', proceso: 'Analítico', clause: '7.3', meta: 5, actual: 7.8, unidad: '%', estado: 'no-cumplido' },
  { id: 'IND-04', nombre: 'Cumplimiento del programa de calibración', proceso: 'Equipos y Metrología', clause: '6.4', meta: 100, actual: 82, unidad: '%', estado: 'progreso' },
  { id: 'IND-05', nombre: 'Satisfacción del cliente interno', proceso: 'Dirección y Gobierno', clause: '4.14', meta: 90, actual: 93, unidad: '%', estado: 'cumplido' },
  { id: 'IND-06', nombre: 'No conformidades cerradas en plazo', proceso: 'NC / CAPA', clause: '8.7', meta: 90, actual: 74, unidad: '%', estado: 'progreso' },
];

// ---------------------------------------------------------------------------
// Auditorías
// ---------------------------------------------------------------------------

export const AUDITS = [
  { id: 'AUD-2026-01', tipo: 'Interna', alcance: 'Analítico — Química clínica', responsable: 'C. Torres', fecha: '14/03/2026', estado: 'Completada', hallazgos: 2 },
  { id: 'AUD-2026-02', tipo: 'Interna', alcance: 'Preanalítico — Toma de muestra', responsable: 'L. Ramos', fecha: '22/05/2026', estado: 'Completada', hallazgos: 0 },
  { id: 'AUD-2026-03', tipo: 'Externa', alcance: 'Sistema de gestión completo', responsable: 'Ente acreditador', fecha: '10/07/2026', estado: 'Completada', hallazgos: 3 },
  { id: 'AUD-2026-04', tipo: 'Interna', alcance: 'Equipos y Metrología', responsable: 'M. Quispe', fecha: '18/10/2026', estado: 'Planificada', hallazgos: null },
  { id: 'AUD-2026-05', tipo: 'Interna', alcance: 'Gestión Documental', responsable: 'A. Núñez', fecha: '25/11/2026', estado: 'Planificada', hallazgos: null },
  { id: 'AUD-2026-06', tipo: 'Interna', alcance: 'Personal — Competencias', responsable: 'C. Torres', fecha: '09/12/2026', estado: 'Planificada', hallazgos: null },
];

export const AUDIT_SUMMARY = {
  planificadas: AUDITS.filter((a) => a.estado === 'Planificada').length,
  completadas: AUDITS.filter((a) => a.estado === 'Completada').length,
  cumplimientoPrograma: 92,
};

// ---------------------------------------------------------------------------
// Revisión por la Dirección
// ---------------------------------------------------------------------------

export const MANAGEMENT_REVIEW_INPUTS = [
  { key: 'indicadores', label: 'Indicadores', icon: 'barras', resumen: '4 de 6 indicadores dentro de meta', estado: 'progreso' },
  { key: 'auditorias', label: 'Auditorías', icon: 'portapapeles', resumen: '3 completadas, 3 planificadas, 92% de cumplimiento del programa', estado: 'cumplido' },
  { key: 'nc', label: 'No conformidades', icon: 'alerta', resumen: '3 abiertas, 1 cerrada este periodo', estado: 'no-cumplido' },
  { key: 'acciones', label: 'Acciones correctivas', icon: 'checkCircle', resumen: '2 en plazo, 1 con evaluación de eficacia pendiente', estado: 'progreso' },
  { key: 'riesgos', label: 'Riesgos', icon: 'diana', resumen: '84% de tratamiento de riesgos y oportunidades', estado: 'progreso' },
  { key: 'eqa', label: 'Resultados de EQA', icon: 'medalla', resumen: 'Sin desviaciones en el último ciclo', estado: 'cumplido' },
  { key: 'quejas', label: 'Quejas', icon: 'campana', resumen: '1 queja registrada, cerrada en 8 días', estado: 'cumplido' },
  { key: 'proveedores', label: 'Desempeño de proveedores', icon: 'manos', resumen: '91% de proveedores evaluados dentro de criterio', estado: 'cumplido' },
  { key: 'objetivos', label: 'Objetivos', icon: 'diana', resumen: '5 de 6 objetivos de calidad en curso', estado: 'progreso' },
  { key: 'personal', label: 'Evaluación de personal', icon: 'personas', resumen: '2 evaluaciones de competencia pendientes', estado: 'progreso' },
  { key: 'mejoras', label: 'Mejoras', icon: 'tendencia', resumen: '4 mejoras identificadas, 2 implementadas', estado: 'progreso' },
];

export const MANAGEMENT_REVIEW_AGREEMENTS = [
  { id: 'ACU-2026-01', decision: 'Reforzar el programa de calibración con doble alerta', responsable: 'M. Quispe', fecha: '30/11/2026', estado: 'progreso' },
  { id: 'ACU-2026-02', decision: 'Actualizar matriz de riesgos de equipos críticos', responsable: 'C. Torres', fecha: '15/12/2026', estado: 'progreso' },
  { id: 'ACU-2026-03', decision: 'Cerrar auditoría externa con plan de acción aprobado', responsable: 'Dirección', fecha: '20/09/2026', estado: 'cumplido' },
];
