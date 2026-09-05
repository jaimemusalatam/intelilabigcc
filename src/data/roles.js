// Roles y matriz de permisos (ISO 15189 — sección "ROLES Y PERMISOS").
// Los permisos se configuran por módulo × acción; aquí se define una matriz
// simplificada por grupo de módulos, suficiente para simular la restricción
// de acciones sensibles (p. ej. autorizar competencias) según el rol activo.

export const ROLES = [
  { id: 'superadmin', label: 'Superadministrador InteliLab', resumen: 'Administración global de la plataforma.' },
  { id: 'admin-lab', label: 'Administrador del laboratorio', resumen: 'Control completo de su organización.' },
  { id: 'calidad', label: 'Responsable de calidad', resumen: 'Acceso al sistema de gestión.' },
  { id: 'director', label: 'Director del laboratorio', resumen: 'Aprobación y consulta.' },
  { id: 'jefe-area', label: 'Jefe de área', resumen: 'Gestión de su área.' },
  { id: 'usuario', label: 'Usuario de laboratorio', resumen: 'Consulta y registro autorizado.' },
  { id: 'auditor', label: 'Auditor', resumen: 'Solo lectura.' },
];

export const PERMISSION_ACTIONS = ['ver', 'crear', 'editar', 'aprobar', 'eliminar', 'descargar'];

export const MODULE_GROUPS = [
  'Mapa de procesos y módulos',
  'Documentos y registros',
  'NC / CAPA',
  'Indicadores y auditorías',
  'Personal (competencia y autorización)',
  'Configuración y roles',
];

// true = permitido. Elimination casi siempre restringida (regla de no
// eliminación física de información crítica).
export const PERMISSION_MATRIX = {
  superadmin: { 'Mapa de procesos y módulos': ['ver', 'crear', 'editar', 'aprobar', 'eliminar', 'descargar'], 'Documentos y registros': ['ver', 'crear', 'editar', 'aprobar', 'eliminar', 'descargar'], 'NC / CAPA': ['ver', 'crear', 'editar', 'aprobar', 'eliminar', 'descargar'], 'Indicadores y auditorías': ['ver', 'crear', 'editar', 'aprobar', 'eliminar', 'descargar'], 'Personal (competencia y autorización)': ['ver', 'crear', 'editar', 'aprobar', 'eliminar', 'descargar'], 'Configuración y roles': ['ver', 'crear', 'editar', 'aprobar', 'eliminar', 'descargar'] },
  'admin-lab': { 'Mapa de procesos y módulos': ['ver', 'crear', 'editar', 'aprobar', 'descargar'], 'Documentos y registros': ['ver', 'crear', 'editar', 'aprobar', 'descargar'], 'NC / CAPA': ['ver', 'crear', 'editar', 'aprobar', 'descargar'], 'Indicadores y auditorías': ['ver', 'crear', 'editar', 'aprobar', 'descargar'], 'Personal (competencia y autorización)': ['ver', 'crear', 'editar', 'aprobar', 'descargar'], 'Configuración y roles': ['ver', 'crear', 'editar'] },
  calidad: { 'Mapa de procesos y módulos': ['ver', 'crear', 'editar', 'descargar'], 'Documentos y registros': ['ver', 'crear', 'editar', 'descargar'], 'NC / CAPA': ['ver', 'crear', 'editar', 'aprobar', 'descargar'], 'Indicadores y auditorías': ['ver', 'crear', 'editar', 'descargar'], 'Personal (competencia y autorización)': ['ver', 'crear', 'editar', 'aprobar', 'descargar'], 'Configuración y roles': ['ver'] },
  director: { 'Mapa de procesos y módulos': ['ver', 'descargar'], 'Documentos y registros': ['ver', 'aprobar', 'descargar'], 'NC / CAPA': ['ver', 'aprobar', 'descargar'], 'Indicadores y auditorías': ['ver', 'aprobar', 'descargar'], 'Personal (competencia y autorización)': ['ver', 'aprobar', 'descargar'], 'Configuración y roles': ['ver'] },
  'jefe-area': { 'Mapa de procesos y módulos': ['ver', 'crear', 'editar', 'descargar'], 'Documentos y registros': ['ver', 'crear', 'editar', 'descargar'], 'NC / CAPA': ['ver', 'crear', 'editar', 'descargar'], 'Indicadores y auditorías': ['ver', 'crear', 'descargar'], 'Personal (competencia y autorización)': ['ver', 'crear', 'descargar'], 'Configuración y roles': [] },
  usuario: { 'Mapa de procesos y módulos': ['ver', 'crear', 'descargar'], 'Documentos y registros': ['ver', 'crear', 'descargar'], 'NC / CAPA': ['ver', 'crear', 'descargar'], 'Indicadores y auditorías': ['ver', 'descargar'], 'Personal (competencia y autorización)': ['ver'], 'Configuración y roles': [] },
  auditor: { 'Mapa de procesos y módulos': ['ver', 'descargar'], 'Documentos y registros': ['ver', 'descargar'], 'NC / CAPA': ['ver', 'descargar'], 'Indicadores y auditorías': ['ver', 'descargar'], 'Personal (competencia y autorización)': ['ver'], 'Configuración y roles': [] },
};

export function canRole(roleId, group, action) {
  return PERMISSION_MATRIX[roleId]?.[group]?.includes(action) ?? false;
}

export function findRole(id) {
  return ROLES.find((r) => r.id === id) ?? ROLES[2];
}
