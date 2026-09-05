// Exportación de reportes sin backend: CSV (abre en Excel) generado en el
// navegador con un blob, y una vista imprimible para "PDF" vía window.print().
export function toCSV(rows, columns) {
  const escape = (value) => {
    const s = String(value ?? '');
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = columns.map((c) => escape(c.label)).join(';');
  const body = rows.map((row) => columns.map((c) => escape(row[c.key])).join(';')).join('\n');
  return `${header}\n${body}`;
}

export function downloadCSV(filename, rows, columns) {
  const csv = '﻿' + toCSV(rows, columns);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
