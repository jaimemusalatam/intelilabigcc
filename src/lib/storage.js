// Persistencia simulada en el navegador (sin backend). Cada colección se guarda
// en localStorage bajo una clave propia; si no hay datos previos se usa la
// semilla (seed) provista. Sirve para simular "permite registrar en la misma
// plataforma…" sin requerir un servidor.
import { useCallback, useEffect, useState } from 'react';

function read(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return seed;
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

let idCounter = 0;

// Genera un id legible y único dentro de la sesión (prefijo + timestamp +
// contador) para entidades creadas desde la UI (sedes, áreas, documentos…).
export function makeId(prefix) {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

export function formatDate(date = new Date()) {
  return date.toLocaleDateString('es-PE');
}

// Estado persistido en localStorage bajo una clave simple (string), con
// fallback a `initial` si no hay valor guardado o el almacenamiento falla.
export function usePersistedState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(key) ?? initial;
    } catch {
      return initial;
    }
  });

  const set = useCallback(
    (next) => {
      setValue(next);
      try {
        localStorage.setItem(key, next);
      } catch {
        /* almacenamiento no disponible */
      }
    },
    [key]
  );

  return [value, set];
}

export function useLocalCollection(key, seed = []) {
  const storageKey = `il-data:${key}`;
  const [items, setItems] = useState(() => read(storageKey, seed));

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible: se continúa solo en memoria */
    }
  }, [storageKey, items]);

  const add = useCallback((item) => setItems((prev) => [item, ...prev]), []);
  const update = useCallback(
    (id, patch) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it))),
    []
  );
  const remove = useCallback((id) => setItems((prev) => prev.filter((it) => it.id !== id)), []);
  const reset = useCallback(() => setItems(seed), [seed]);

  return { items, setItems, add, update, remove, reset };
}

// ---------------------------------------------------------------------------
// Historial de auditoría del software (registro inmutable de acciones)
// ---------------------------------------------------------------------------

const AUDIT_KEY = 'il-data:audit-log';
const AUDIT_SEED_FLAG = 'il-data:audit-log-seeded';

let listeners = [];

function readAuditLog() {
  return read(AUDIT_KEY, []);
}

function writeAuditLog(entries) {
  try {
    localStorage.setItem(AUDIT_KEY, JSON.stringify(entries));
  } catch {
    /* almacenamiento no disponible */
  }
  listeners.forEach((fn) => fn(entries));
}

export function seedAuditLog(seed) {
  try {
    if (localStorage.getItem(AUDIT_SEED_FLAG)) return;
    localStorage.setItem(AUDIT_SEED_FLAG, '1');
  } catch {
    return;
  }
  const current = readAuditLog();
  if (current.length === 0) writeAuditLog(seed);
}

export function logAction({ usuario, accion, elemento, valorAnterior = '—', valorNuevo = '—' }) {
  const now = new Date();
  const entry = {
    id: makeId('LOG'),
    usuario,
    fecha: formatDate(now),
    hora: now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
    accion,
    elemento,
    valorAnterior,
    valorNuevo,
    ip: 'sesión local (navegador)',
  };
  writeAuditLog([entry, ...readAuditLog()]);
  return entry;
}

export function useAuditLog() {
  const [entries, setEntries] = useState(readAuditLog);

  useEffect(() => {
    listeners.push(setEntries);
    return () => {
      listeners = listeners.filter((fn) => fn !== setEntries);
    };
  }, []);

  return entries;
}
