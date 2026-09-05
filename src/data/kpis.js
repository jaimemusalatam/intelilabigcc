// KPIs ejecutivos del dashboard (sección "DASHBOARD" de la especificación):
// actividades vencidas/próximas, NC abiertas, acciones vencidas, documentos
// por revisar, competencias/mantenimientos/calibraciones vencidas, EQA pendientes.
import { NC_LIST, AUDITS, ALL_PROCESSES } from './mock';
import { SPECIAL_RECORDS } from './specialRecords';

function rowsForBlock(blockKey) {
  return Object.values(SPECIAL_RECORDS)
    .flat()
    .filter((b) => b.key === blockKey)
    .flatMap((b) => b.seed);
}

function countMatching(blockKey, pattern) {
  return rowsForBlock(blockKey).filter((r) => pattern.test(String(r.estado ?? ''))).length;
}

export function dashboardKpis() {
  const ncVencidas = NC_LIST.filter((n) => n.estado === 'Vencida').length;
  const ncAbiertas = NC_LIST.filter((n) => n.estado !== 'Cerrada').length;
  const auditoriasProximas = AUDITS.filter((a) => a.estado === 'Planificada').length;

  return {
    ncAbiertas,
    actividadesVencidas: ncVencidas + countMatching('mantenimiento', /vencid/i) + countMatching('calibracion', /vencid/i),
    actividadesProximas: countMatching('mantenimiento', /pr[oó]xima/i) + countMatching('calibracion', /pr[oó]xima/i) + auditoriasProximas,
    documentosPorRevisar: countMatching('listado-maestro', /revisi[oó]n|obsoleto/i),
    competenciasVencidas: countMatching('competencia', /vencid/i),
    mantenimientosVencidos: countMatching('mantenimiento', /vencid/i),
    calibracionesVencidas: countMatching('calibracion', /vencid/i),
    eqaPendientes: countMatching('eqa', /pendiente/i),
  };
}

const CONCERNING = /vencid|pr[oó]xima|pendiente|abierto|fuera de servicio|fuera de meta/i;

function processNameFor(processId) {
  return ALL_PROCESSES.find((p) => p.id === processId)?.name ?? processId;
}

// Central de Alertas: NO existen alertas independientes por módulo — esta
// función centraliza todas las alertas por proceso y requisito de la norma.
export function buildCentralAlerts() {
  const alerts = [];

  ALL_PROCESSES.forEach((p) => {
    if (p.alerts > 0) {
      alerts.push({ id: `proc-${p.id}`, proceso: p.name, tipo: 'Proceso', descripcion: `${p.alerts} alerta(s) pendientes en el proceso`, estado: 'progreso', to: `/procesos/${p.id}` });
    }
  });

  NC_LIST.filter((n) => n.estado !== 'Cerrada').forEach((n) => {
    alerts.push({ id: n.id, proceso: n.proceso, tipo: 'NC / CAPA', descripcion: n.desc, estado: n.tag, to: '/nc-capa' });
  });

  AUDITS.filter((a) => a.estado === 'Planificada').forEach((a) => {
    alerts.push({ id: a.id, proceso: a.alcance, tipo: 'Auditoría', descripcion: `Auditoría planificada para ${a.fecha}`, estado: 'progreso', to: '/auditorias' });
  });

  Object.entries(SPECIAL_RECORDS).forEach(([processId, blocks]) => {
    blocks.forEach((block) => {
      block.seed
        .filter((row) => CONCERNING.test(String(row.estado ?? '')))
        .forEach((row) => {
          const label = row.persona ?? row.equipo ?? row.proveedor ?? row.analito ?? row.tipo ?? row.reactivo ?? row.reclamo ?? row.riesgo ?? row.mejora ?? row.subproceso ?? 'Registro';
          alerts.push({
            id: row.id,
            proceso: processNameFor(processId),
            tipo: block.title,
            descripcion: `${label} — ${row.estado}`,
            estado: /vencid/i.test(row.estado) ? 'no-cumplido' : 'progreso',
            to: `/procesos/${processId}`,
          });
        });
    });
  });

  return alerts;
}
