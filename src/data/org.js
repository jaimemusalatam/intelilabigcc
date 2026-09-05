// Arquitectura multisede: Organización → Sede → Área (ver sección "MULTISEDE").
export const ORG_TREE_SEED = {
  id: 'org-1',
  name: 'Laboratorio Clínico Referencia S.A.',
  sedes: [
    {
      id: 'sede-lima',
      name: 'Sede Lima',
      areas: [
        { id: 'area-lima-analitico', name: 'Área Analítica' },
        { id: 'area-lima-preanalitico', name: 'Área Preanalítica' },
        { id: 'area-lima-calidad', name: 'Aseguramiento de la Calidad' },
      ],
    },
    {
      id: 'sede-arequipa',
      name: 'Sede Arequipa',
      areas: [
        { id: 'area-aqp-analitico', name: 'Área Analítica' },
        { id: 'area-aqp-calidad', name: 'Aseguramiento de la Calidad' },
      ],
    },
    {
      id: 'sede-trujillo',
      name: 'Sede Trujillo',
      areas: [{ id: 'area-tru-analitico', name: 'Área Analítica' }],
    },
  ],
};
