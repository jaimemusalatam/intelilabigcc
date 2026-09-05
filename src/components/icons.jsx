// Iconografía InteliLab IGCC — trazo 1.5px, caja 24px, currentColor.
// Paths base extraídos de InteliLab Design System.dc.html; se añaden algunos
// utilitarios (chevron, cerrar, más, filtro, descarga...) en el mismo lenguaje visual.

export const ICON_PATHS = {
  home: ['m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z'],
  capas: ['m12 3 9 5-9 5-9-5z', 'm3 14 9 5 9-5'],
  doc: ['M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z', 'M14 3v5h5', 'M9 13h6', 'M9 17h4'],
  barras: ['M6 20V10', 'M12 20V4', 'M18 20v-6'],
  alerta: ['M12 4 2.5 20h19z', 'M12 10v4', 'M12 17.4v.1'],
  portapapeles: ['M9 4h6v3H9z', 'M9 5.5H7a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1h-2', 'm9.5 14 2 2 3.5-3.5'],
  escudo: ['M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z'],
  escudoCheck: ['M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z', 'm9 12 2 2 4-4'],
  personas: ['M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6', 'M16 5.2a3.5 3.5 0 0 1 0 6.6', 'M17 14.3c2.4.7 4 2.9 4 5.7'],
  config: ['M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', 'M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 14H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.6V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.5 1.5l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z'],
  campana: ['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.7 21a2 2 0 0 1-3.4 0'],
  matraz: ['M9 3h6', 'M10 3v6l-5.4 9A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-3L14 9V3'],
  microscopio: ['M6 21h12', 'M9 21V9', 'M9 9h3l2-4-3-1.5L9 6', 'M14 12a5 5 0 0 1-4 8'],
  edificio: ['M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16', 'M16 8h2a2 2 0 0 1 2 2v11', 'M8 7h4', 'M8 11h4', 'M8 15h4'],
  monitor: ['M3 5h18v11H3z', 'M8 20h8', 'M12 16v4'],
  manos: ['m3 12 4-4 4 3 3-3 4 4', 'M3 12l4 5h10l4-5'],
  lupa: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'm20 20-4-4'],
  tendencia: ['m3 17 6-6 4 4 8-8', 'M15 7h6v6'],
  reloj: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 7v5l3 2'],
  diana: ['M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', 'M12 11.6v.1'],
  calendario: ['M4 6h16v15H4z', 'M4 10h16', 'M8 3v4', 'M16 3v4'],
  nube: ['M7 18a4 4 0 0 1 .6-8 5.5 5.5 0 0 1 10.5 1.6A3.5 3.5 0 0 1 17.5 18z', 'M12 15V9', 'm9.5 11.5 2.5-2.5 2.5 2.5'],
  medalla: ['M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10z', 'm8.5 12.5-1.5 8 5-2.5 5 2.5-1.5-8'],
  candado: ['M5 11h14v10H5z', 'M8 11V7.5a4 4 0 0 1 8 0V11'],

  // Utilitarios (mismo lenguaje visual, no forman parte de la placa 03 Iconografía)
  chevronRight: ['m9 6 6 6-6 6'],
  chevronDown: ['m6 9 6 6 6-6'],
  chevronLeft: ['m15 6-6 6 6 6'],
  x: ['M6 6l12 12', 'M18 6 6 18'],
  checkCircle: ['M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z', 'm8.5 12.5 2.5 2.5 4.5-5'],
  clockCircle: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7v5l3 2'],
  xCircle: ['M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z', 'm9 9 6 6', 'm15 9-6 6'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  plus: ['M12 5v14', 'M5 12h14'],
  download: ['M12 3v12', 'm7 11 5 5 5-5', 'M5 21h14'],
  upload: ['M12 21V9', 'm7 13 5-5 5 5', 'M5 3h14'],
  filter: ['M4 5h16', 'M7 12h10', 'M10 19h4'],
  link: ['M9 15l6-6', 'M13 6h3a4 4 0 0 1 0 8h-1', 'M11 18H8a4 4 0 0 1 0-8h1'],
  info: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 11v6', 'M12 7.5v.1'],
  file: ['M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z', 'M14 3v5h5'],
  arrowRight: ['M5 12h14', 'm13 6 6 6-6 6'],
  refresh: ['M20 12a8 8 0 1 1-3-6.3', 'M20 4v5h-5'],
  paperclip: ['M8 12.5V7a4 4 0 0 1 8 0v9a2.5 2.5 0 0 1-5 0V8.5'],
  send: ['m3 11 18-8-8 18-2-8z'],
};

export function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 1.5, style, className }) {
  const paths = ICON_PATHS[name];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

// Íconos de navegación / mapa de procesos usados en las capturas de referencia.
export const ICONS_KIT = [
  ['Inicio', 'home'], ['Procesos', 'capas'], ['Documentos', 'doc'], ['Indicadores', 'barras'],
  ['NC / CAPA', 'alerta'], ['Auditorías', 'portapapeles'], ['Modo Auditoría', 'escudo'],
  ['Personal', 'personas'], ['Configuración', 'config'], ['Notificaciones', 'campana'],
  ['Reactivos', 'matraz'], ['Analítico', 'microscopio'], ['Instalaciones', 'edificio'],
  ['Equipo', 'monitor'], ['Proveedores', 'manos'], ['Búsqueda', 'lupa'],
  ['Mejora', 'tendencia'], ['Vigencia', 'reloj'], ['Objetivo', 'diana'],
  ['Programación', 'calendario'], ['Subir evidencia', 'nube'], ['Acreditación', 'medalla'],
  ['Confidencialidad', 'candado'], ['Revisión Dirección', 'personas'],
];
