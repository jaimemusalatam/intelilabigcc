// Buscador general: permite escribir p. ej. "micropipeta" y obtener
// coincidencias entre procesos, requisitos, documentos, equipos,
// calibraciones, riesgos, NC y registros.
import { ALL_PROCESSES, REQUIREMENTS_BY_PROCESS, NC_LIST, INDICATORS } from '../data/mock';
import { SPECIAL_RECORDS, labelForRow } from '../data/specialRecords';

const EQUIPO_BLOCKS = ['listado-equipos', 'mantenimiento', 'calibracion'];
const METODO_BLOCKS = ['metodos', 'verificacion-cuantitativa', 'verificacion-cualitativa', 'incertidumbre', 'eqa'];
const PERSONA_BLOCKS = ['hoja-vida', 'induccion', 'competencia', 'capacitacion', 'compromisos-imparcialidad', 'compromisos-confidencialidad', 'conflictos-interes'];

// El resto de bloques (p. ej. listado-maestro) cae en 'documento' por defecto.
function categoryForBlock(key) {
  if (EQUIPO_BLOCKS.includes(key)) return 'equipo';
  if (METODO_BLOCKS.includes(key)) return 'metodo';
  if (PERSONA_BLOCKS.includes(key)) return 'persona';
  return 'documento';
}

export function buildSearchIndex() {
  const index = [];

  ALL_PROCESSES.forEach((p) => index.push({ category: 'proceso', type: 'Proceso', label: p.name, meta: `ISO ${p.clause}`, to: `/procesos/${p.id}` }));

  Object.entries(REQUIREMENTS_BY_PROCESS).forEach(([processId, reqs]) => {
    reqs.forEach((r) => index.push({ category: 'requisito', type: 'Requisito ISO', label: `${r.id} — ${r.desc}`, meta: r.responsable, to: `/procesos/${processId}` }));
  });

  NC_LIST.forEach((n) => index.push({ category: 'documento', type: 'NC', label: `${n.id} — ${n.desc}`, meta: n.proceso, to: '/nc-capa' }));

  INDICATORS.forEach((i) => index.push({ category: 'documento', type: 'Indicador', label: i.nombre, meta: i.proceso, to: '/indicadores' }));

  Object.entries(SPECIAL_RECORDS).forEach(([processId, blocks]) => {
    blocks.forEach((block) => {
      block.seed.forEach((row) => {
        index.push({ category: categoryForBlock(block.key), type: block.title, label: labelForRow(row), meta: row.estado, to: `/procesos/${processId}` });
      });
    });
  });

  return index;
}

export function searchByCategory(index, category, query) {
  const q = query.trim().toLowerCase();
  return index.filter((item) => item.category === category && (!q || item.label.toLowerCase().includes(q)));
}

export function search(index, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter((item) => item.label.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)).slice(0, 30);
}
