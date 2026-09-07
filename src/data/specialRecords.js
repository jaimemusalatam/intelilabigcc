// Registros especiales por proceso: la especificación pide que ciertos módulos
// permitan "registrar en la misma plataforma" listados propios (matriz de
// riesgos, listado de equipos, programas de mantenimiento/calibración,
// eventos adversos, listado de proveedores, listado maestro de documentos,
// compromisos de imparcialidad/confidencialidad, submódulos de personal,
// subprocesos preanalíticos, submódulos analíticos, valores críticos,
// simulacros de continuidad, reclamos, etc.). Cada bloque es genérico:
// columnas + filas + (opcional) campos de alta rápida.

function block(key, title, columns, seed, opts = {}) {
  return { key, title, columns, seed, addFields: opts.addFields ?? columns, roleGroup: opts.roleGroup ?? null, note: opts.note };
}

export const SPECIAL_RECORDS = {
  imparcialidad: [
    block(
      'compromisos-imparcialidad',
      'Compromisos del personal — Imparcialidad',
      [{ key: 'persona', label: 'Persona' }, { key: 'cargo', label: 'Cargo' }, { key: 'fecha', label: 'Fecha de firma' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'CIMP-01', persona: 'M. Quispe', cargo: 'Responsable de calidad', fecha: '10/01/2026', estado: 'Firmado' },
        { id: 'CIMP-02', persona: 'C. Torres', cargo: 'Analista senior', fecha: '10/01/2026', estado: 'Firmado' },
        { id: 'CIMP-03', persona: 'A. Núñez', cargo: 'Analista', fecha: '—', estado: 'Pendiente' },
      ]
    ),
    block(
      'conflictos-interes',
      'Conflictos de interés registrados',
      [{ key: 'persona', label: 'Persona' }, { key: 'descripcion', label: 'Descripción' }, { key: 'fecha', label: 'Fecha' }, { key: 'estado', label: 'Estado' }],
      [{ id: 'COI-01', persona: 'L. Ramos', descripcion: 'Familiar directo en proveedor de reactivos', fecha: '05/03/2026', estado: 'Abierto' }]
    ),
    block(
      'compromisos-confidencialidad',
      'Compromisos del personal — Confidencialidad',
      [{ key: 'persona', label: 'Persona' }, { key: 'cargo', label: 'Cargo' }, { key: 'fecha', label: 'Fecha de firma' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'CCONF-01', persona: 'M. Quispe', cargo: 'Responsable de calidad', fecha: '10/01/2026', estado: 'Firmado' },
        { id: 'CCONF-02', persona: 'C. Torres', cargo: 'Analista senior', fecha: '10/01/2026', estado: 'Firmado' },
        { id: 'CCONF-03', persona: 'L. Ramos', cargo: 'Analista', fecha: '—', estado: 'Pendiente' },
      ]
    ),
  ],

  documental: [
    block(
      'listado-maestro',
      'Listado maestro de documentos (descargable)',
      [{ key: 'codigo', label: 'Código' }, { key: 'nombre', label: 'Nombre' }, { key: 'tipo', label: 'Tipo' }, { key: 'origen', label: 'Origen' }, { key: 'version', label: 'Versión' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'DOC-001', codigo: 'POE-LAB-001', nombre: 'Control de documentos', tipo: 'Procedimiento', origen: 'Interno', version: 'v3.0', estado: 'Vigente' },
        { id: 'DOC-002', codigo: 'POE-LAB-005', nombre: 'Trabajo no conforme', tipo: 'Procedimiento', origen: 'Interno', version: 'v2.1', estado: 'Vigente' },
        { id: 'DOC-003', codigo: 'ISO-15189', nombre: 'Norma ISO 15189:2022', tipo: 'Documento externo', origen: 'Externo', version: '2022', estado: 'Vigente' },
        { id: 'DOC-004', codigo: 'MAN-CAL-002', nombre: 'Manual de calidad (versión anterior)', tipo: 'Manual', origen: 'Interno', version: 'v4.0', estado: 'Obsoleto' },
      ],
      { note: 'Genera indicador de cantidad de documentos internos/externos y alertas de documentos por revisar.' }
    ),
  ],

  riesgos: [
    block(
      'matriz-riesgos',
      'Matriz de riesgos y oportunidades',
      [{ key: 'proceso', label: 'Proceso' }, { key: 'riesgo', label: 'Riesgo / oportunidad' }, { key: 'probabilidad', label: 'Prob.' }, { key: 'impacto', label: 'Impacto' }, { key: 'nivel', label: 'Nivel' }, { key: 'tratamiento', label: 'Tratamiento' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'RGO-01', proceso: 'Equipos y Metrología', riesgo: 'Falla de equipo crítico sin respaldo', probabilidad: 'Media', impacto: 'Alto', nivel: 'Alto', tratamiento: 'Contrato de mantenimiento con respuesta 24h', estado: 'En tratamiento' },
        { id: 'RGO-02', proceso: 'Preanalítico', riesgo: 'Error de identificación de paciente', probabilidad: 'Baja', impacto: 'Alto', nivel: 'Medio', tratamiento: 'Doble verificación con código de barras', estado: 'Controlado' },
        { id: 'RGO-03', proceso: 'Personal', riesgo: 'Rotación de personal clave sin plan de sucesión', probabilidad: 'Media', impacto: 'Medio', nivel: 'Medio', tratamiento: 'Plan de backup y capacitación cruzada', estado: 'En tratamiento' },
        { id: 'RGO-04', proceso: 'Analítico', riesgo: 'Oportunidad: automatización de validación de resultados', probabilidad: '—', impacto: 'Alto', nivel: 'Oportunidad', tratamiento: 'Evaluar middleware de autovalidación', estado: 'En evaluación' },
      ]
    ),
  ],

  mejora: [
    block(
      'registro-mejoras',
      'Mejoras identificadas',
      [{ key: 'proceso', label: 'Proceso' }, { key: 'mejora', label: 'Mejora identificada' }, { key: 'responsable', label: 'Responsable' }, { key: 'plazo', label: 'Plazo' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'MEJ-01', proceso: 'Equipos y Metrología', mejora: 'Migrar programa de calibración a alertas dobles', responsable: 'C. Torres', plazo: '30/11/2026', estado: 'En progreso' },
        { id: 'MEJ-02', proceso: 'Gestión Documental', mejora: 'Automatizar control de versiones', responsable: 'A. Núñez', plazo: '15/10/2026', estado: 'Implementada' },
        { id: 'MEJ-03', proceso: 'Analítico', mejora: 'Incorporar reglas de Westgard multi-regla', responsable: 'M. Quispe', plazo: '20/12/2026', estado: 'Planificada' },
      ]
    ),
  ],

  personal: [
    block(
      'hoja-vida',
      'Personal — Hoja de vida documentada (CV)',
      [{ key: 'persona', label: 'Persona' }, { key: 'cargo', label: 'Cargo' }, { key: 'documentado', label: 'CV documentado' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'CV-01', persona: 'M. Quispe', cargo: 'Responsable de calidad', documentado: 'Sí', estado: 'Vigente' },
        { id: 'CV-02', persona: 'C. Torres', cargo: 'Analista senior', documentado: 'Sí', estado: 'Vigente' },
        { id: 'CV-03', persona: 'A. Núñez', cargo: 'Analista', documentado: 'No', estado: 'Pendiente' },
      ]
    ),
    block(
      'induccion',
      'Inducción y entrenamiento',
      [{ key: 'persona', label: 'Persona' }, { key: 'induccion', label: 'Inducción realizada' }, { key: 'fecha', label: 'Fecha' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'IND-P-01', persona: 'A. Núñez', induccion: 'Inducción general + puesto de trabajo', fecha: '15/01/2026', estado: 'Completada' },
        { id: 'IND-P-02', persona: 'L. Ramos', induccion: 'Inducción de bioseguridad', fecha: '—', estado: 'Pendiente' },
      ]
    ),
    block(
      'competencia',
      'Competencia y autorización',
      [{ key: 'persona', label: 'Persona' }, { key: 'competencia', label: 'Competencia evaluada' }, { key: 'vigencia', label: 'Vigente hasta' }, { key: 'autorizado', label: 'Autorizado' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'COMP-01', persona: 'C. Torres', competencia: 'Química clínica — analizador X500', vigencia: '30/11/2026', autorizado: 'Sí', estado: 'Vigente' },
        { id: 'COMP-02', persona: 'A. Núñez', competencia: 'Hematología — analizador H200', vigencia: '10/09/2026', autorizado: 'Sí', estado: 'Próxima a vencer' },
        { id: 'COMP-03', persona: 'L. Ramos', competencia: 'Toma de muestra venosa', vigencia: '01/06/2026', autorizado: 'No', estado: 'Vencida' },
      ],
      { roleGroup: 'Personal (competencia y autorización)', note: 'La autorización solo puede activarla un rol con autoridad para evaluar (calidad, administración o dirección).' }
    ),
    block(
      'capacitacion',
      'Plan de capacitación y evidencias',
      [{ key: 'tema', label: 'Tema' }, { key: 'responsable', label: 'Responsable' }, { key: 'fecha', label: 'Fecha programada' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'CAP-01', tema: 'Actualización ISO 15189:2022', responsable: 'M. Quispe', fecha: '15/10/2026', estado: 'Completada' },
        { id: 'CAP-02', tema: 'Manejo de no conformidades', responsable: 'M. Quispe', fecha: '05/11/2026', estado: 'Programada' },
      ]
    ),
  ],

  equipos: [
    block(
      'listado-equipos',
      'Listado de equipos',
      [{ key: 'codigo', label: 'Código' }, { key: 'nombre', label: 'Equipo' }, { key: 'ubicacion', label: 'Ubicación' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'EQ-01', codigo: 'EQ-014', nombre: 'Analizador de química clínica X500', ubicacion: 'Área Analítica', estado: 'Operativo' },
        { id: 'EQ-02', codigo: 'EQ-021', nombre: 'Centrífuga refrigerada C-3', ubicacion: 'Área Preanalítica', estado: 'Operativo' },
        { id: 'EQ-03', codigo: 'EQ-033', nombre: 'Micropipeta multicanal', ubicacion: 'Área Analítica', estado: 'Fuera de servicio' },
      ]
    ),
    block(
      'mantenimiento',
      'Programa de mantenimiento',
      [{ key: 'equipo', label: 'Equipo' }, { key: 'tipo', label: 'Tipo' }, { key: 'proximo', label: 'Próximo mantenimiento' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'MTO-01', equipo: 'EQ-014', tipo: 'Preventivo', proximo: '30/09/2026', estado: 'Próximo a vencer' },
        { id: 'MTO-02', equipo: 'EQ-021', tipo: 'Preventivo', proximo: '15/12/2026', estado: 'Programado' },
        { id: 'MTO-03', equipo: 'EQ-033', tipo: 'Correctivo', proximo: '20/08/2026', estado: 'Vencido' },
      ]
    ),
    block(
      'calibracion',
      'Programa de calibración (metrología · ISO 6.5)',
      [{ key: 'equipo', label: 'Equipo' }, { key: 'patron', label: 'Patrón / trazabilidad' }, { key: 'proxima', label: 'Próxima calibración' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'CAL-01', equipo: 'EQ-014', patron: 'Patrón certificado NIST', proxima: '10/10/2026', estado: 'Próxima a vencer' },
        { id: 'CAL-02', equipo: 'EQ-033', patron: 'Pesas certificadas clase E2', proxima: '05/08/2026', estado: 'Vencida' },
      ]
    ),
  ],

  reactivos: [
    block(
      'eventos-adversos',
      'Eventos adversos relacionados a reactivos',
      [{ key: 'reactivo', label: 'Reactivo' }, { key: 'lote', label: 'Lote' }, { key: 'evento', label: 'Evento' }, { key: 'fecha', label: 'Fecha' }, { key: 'estado', label: 'Estado' }],
      [{ id: 'EA-01', reactivo: 'Reactivo glucosa GOD-PAP', lote: 'L-2026-045', evento: 'Resultados fuera de rango de control', fecha: '12/08/2026', estado: 'Cerrado' }]
    ),
  ],

  proveedores: [
    block(
      'listado-proveedores',
      'Proveedores aprobados',
      [{ key: 'proveedor', label: 'Proveedor' }, { key: 'servicio', label: 'Servicio / insumo' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'PRV-01', proveedor: 'Distribuidora Científica S.A.', servicio: 'Reactivos de química clínica', estado: 'Aprobado' },
        { id: 'PRV-02', proveedor: 'MetroCalibra E.I.R.L.', servicio: 'Servicio de calibración', estado: 'Aprobado' },
      ]
    ),
    block(
      'evaluacion-desempeno',
      'Evaluación de desempeño de proveedores',
      [{ key: 'proveedor', label: 'Proveedor' }, { key: 'ultimaEvaluacion', label: 'Última evaluación' }, { key: 'puntaje', label: 'Puntaje' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'EVP-01', proveedor: 'Distribuidora Científica S.A.', ultimaEvaluacion: '15/06/2026', puntaje: '93%', estado: 'Aprobado' },
        { id: 'EVP-02', proveedor: 'MetroCalibra E.I.R.L.', ultimaEvaluacion: '02/12/2025', puntaje: '—', estado: 'Evaluación vencida' },
      ]
    ),
  ],

  preanalitico: [
    block(
      'subprocesos',
      'Subprocesos preanalíticos',
      [{ key: 'subproceso', label: 'Subproceso' }, { key: 'procedimiento', label: 'Procedimiento vigente' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'PRE-01', subproceso: 'Solicitud del análisis', procedimiento: 'POE-PRE-001', estado: 'Vigente' },
        { id: 'PRE-02', subproceso: 'Atención y registro del paciente', procedimiento: 'POE-PRE-002', estado: 'Vigente' },
        { id: 'PRE-03', subproceso: 'Verificación de pre-requisitos', procedimiento: 'POE-PRE-003', estado: 'Vigente' },
        { id: 'PRE-04', subproceso: 'Preparación para la toma y venopunción', procedimiento: 'POE-PRE-004', estado: 'Vigente' },
        { id: 'PRE-05', subproceso: 'Etiquetado de la muestra', procedimiento: 'POE-PRE-005', estado: 'Vigente' },
        { id: 'PRE-06', subproceso: 'Transporte', procedimiento: 'POE-PRE-006', estado: 'En revisión' },
        { id: 'PRE-07', subproceso: 'Recepción y preparación de la muestra', procedimiento: 'POE-PRE-007', estado: 'Vigente' },
      ]
    ),
  ],

  analitico: [
    block(
      'metodos',
      'Métodos de análisis',
      [{ key: 'metodo', label: 'Método' }, { key: 'prueba', label: 'Prueba' }, { key: 'estado', label: 'Estado' }],
      [{ id: 'MET-01', metodo: 'Colorimétrico enzimático', prueba: 'Glucosa', estado: 'Vigente' }, { id: 'MET-02', metodo: 'Inmunoensayo quimioluminiscente', prueba: 'TSH', estado: 'Vigente' }]
    ),
    block(
      'verificacion-cuantitativa',
      'Verificación cuantitativa',
      [{ key: 'prueba', label: 'Prueba' }, { key: 'precision', label: 'Precisión' }, { key: 'veracidad', label: 'Veracidad' }, { key: 'linealidad', label: 'Linealidad' }, { key: 'estado', label: 'Estado' }],
      [{ id: 'VC-01', prueba: 'Glucosa', precision: 'CV 1.8%', veracidad: 'Sesgo 2.1%', linealidad: 'r² 0.998', estado: 'Cumple' }]
    ),
    block(
      'verificacion-cualitativa',
      'Validación y verificación cualitativa',
      [{ key: 'prueba', label: 'Prueba' }, { key: 'sensibilidad', label: 'Sensibilidad clínica' }, { key: 'especificidad', label: 'Especificidad clínica' }, { key: 'estado', label: 'Estado' }],
      [{ id: 'VQ-01', prueba: 'Prueba rápida VIH', sensibilidad: '99.1%', especificidad: '98.7%', estado: 'Cumple' }]
    ),
    block(
      'incertidumbre',
      'Incertidumbre de medición',
      [{ key: 'prueba', label: 'Prueba' }, { key: 'incertidumbre', label: 'Incertidumbre expandida' }, { key: 'estado', label: 'Estado' }],
      [{ id: 'INC-01', prueba: 'Glucosa', incertidumbre: '± 4.2%', estado: 'Estimada' }]
    ),
    block(
      'control-interno-calidad',
      'Control interno de calidad (Levey-Jennings)',
      [{ key: 'prueba', label: 'Prueba' }, { key: 'media', label: 'Media' }, { key: 'de', label: 'DE' }, { key: 'cv', label: 'CV' }, { key: 'reglas', label: 'Reglas de control' }, { key: 'sesgo', label: 'Sesgo' }, { key: 'errorTotal', label: 'Error total' }, { key: 'sigma', label: 'Sigma' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'QC-01', prueba: 'Glucosa — nivel 2', media: '100 mg/dL', de: '1.8', cv: '1.8%', reglas: '1-3s / 2-2s / R-4s', sesgo: '2.1%', errorTotal: '5.2%', sigma: '4.1', estado: 'Bajo control' },
        { id: 'QC-02', prueba: 'Potasio — nivel 2', media: '4.5 mmol/L', de: '0.15', cv: '3.3%', reglas: '1-3s', sesgo: '1.0%', errorTotal: '6.8%', sigma: '2.9', estado: 'Fuera de control' },
      ],
      { note: 'Las gráficas Levey-Jennings del nivel seleccionado se muestran debajo de la tabla.' }
    ),
    block(
      'eqa',
      'Evaluación externa de la calidad (EQA)',
      [{ key: 'programa', label: 'Programa EQA' }, { key: 'ciclo', label: 'Último ciclo' }, { key: 'resultado', label: 'Resultado' }, { key: 'estado', label: 'Estado' }],
      [{ id: 'EQA-01', programa: 'Programa nacional de química clínica', ciclo: '2026 — Ciclo 2', resultado: 'Sin desviaciones', estado: 'Cumple' }]
    ),
  ],

  postanalitico: [
    block(
      'valores-criticos',
      'Valores críticos y tiempos de respuesta',
      [{ key: 'analito', label: 'Analito' }, { key: 'valorCritico', label: 'Valor crítico' }, { key: 'tiempoMeta', label: 'Meta (min)' }, { key: 'tiempoReal', label: 'Real (min)' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'VCR-01', analito: 'Potasio', valorCritico: '> 6.5 mmol/L', tiempoMeta: '30', tiempoReal: '24', estado: 'Cumple' },
        { id: 'VCR-02', analito: 'Glucosa', valorCritico: '< 40 mg/dL', tiempoMeta: '30', tiempoReal: '35', estado: 'Fuera de meta' },
      ]
    ),
  ],

  reclamos: [
    block(
      'reclamos',
      'Reclamos y quejas',
      [{ key: 'reclamo', label: 'Reclamo / queja' }, { key: 'origen', label: 'Origen' }, { key: 'fecha', label: 'Fecha' }, { key: 'accion', label: 'Acción tomada' }, { key: 'estado', label: 'Estado' }],
      [{ id: 'REC-01', reclamo: 'Demora en la entrega de resultados', origen: 'Paciente', fecha: '18/07/2026', accion: 'Se agilizó el flujo de validación y se contactó al paciente', estado: 'Cerrado' }]
    ),
  ],

  continuidad: [
    block(
      'pruebas-simulacros',
      'Pruebas y simulacros de continuidad',
      [{ key: 'tipo', label: 'Tipo de prueba' }, { key: 'fecha', label: 'Fecha programada' }, { key: 'responsable', label: 'Responsable' }, { key: 'estado', label: 'Estado' }],
      [
        { id: 'CONT-01', tipo: 'Corte de energía — grupo electrógeno', fecha: '30/10/2026', responsable: 'L. Ramos', estado: 'Programado' },
        { id: 'CONT-02', tipo: 'Falla de sistema informático', fecha: '15/06/2026', responsable: 'A. Núñez', estado: 'Ejecutado' },
      ]
    ),
  ],
};

export function specialRecordsFor(processId) {
  return SPECIAL_RECORDS[processId] ?? [];
}

// Deriva una etiqueta legible para una fila de SPECIAL_RECORDS, cuyo shape
// varía por bloque (persona, equipo, proveedor, riesgo, etc.).
export function labelForRow(row) {
  return (
    row.nombre ?? row.equipo ?? row.persona ?? row.proveedor ?? row.analito ?? row.reactivo ??
    row.reclamo ?? row.riesgo ?? row.mejora ?? row.subproceso ?? row.codigo ?? row.metodo ??
    row.programa ?? row.tipo ?? 'Registro'
  );
}

// Puntos de control diarios para las gráficas Levey-Jennings del bloque
// "Control interno de calidad" (media, ±1DE, ±2DE, ±3DE).
export const LJ_SERIES = {
  'QC-01': { media: 100, de: 1.8, puntos: [100.5, 101.2, 99.8, 102.1, 100.9, 98.7, 100.2, 103.4, 101.6, 100.0, 99.4, 100.8] },
  'QC-02': { media: 4.5, de: 0.15, puntos: [4.52, 4.61, 4.48, 4.71, 4.9, 4.55, 4.6, 4.75, 4.58, 4.9, 4.62, 4.5] },
};
