import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './icons';
import { buildSearchIndex, search } from '../lib/searchIndex';

export function GlobalSearch({ onClose }) {
  const navigate = useNavigate();
  const index = useMemo(() => buildSearchIndex(), []);
  const [query, setQuery] = useState('');
  const results = search(index, query);

  const go = (to) => {
    navigate(to);
    onClose();
  };

  return (
    <div className="il-search-overlay" onClick={onClose}>
      <div className="il-search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="il-input" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48 }}>
          <Icon name="lupa" size={18} color="var(--il-ink-3)" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Buscar en toda la plataforma… p. ej. "micropipeta"'
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14, fontFamily: 'inherit' }}
          />
          <button onClick={onClose} className="il-btn il-btn--ghost" style={{ height: 32, padding: '0 8px' }}><Icon name="x" size={16} /></button>
        </div>
        <div className="il-search-results">
          {query.trim() && results.length === 0 && <p className="il-text-body" style={{ padding: 16 }}>Sin resultados para «{query}».</p>}
          {results.map((r, i) => (
            <button key={i} className="il-table-row" style={{ display: 'grid', gridTemplateColumns: '150px 1fr 120px' }} onClick={() => go(r.to)}>
              <span className="il-text-small">{r.type}</span>
              <span>{r.label}</span>
              <span className="il-text-meta">{r.meta}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
