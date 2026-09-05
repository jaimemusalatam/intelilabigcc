const R = 52;
const CIRC = 2 * Math.PI * R;

export function ComplianceRing({ percent, cumplidos, progreso, noCumplidos, size = 132, label = 'Cumplimiento' }) {
  const total = cumplidos + progreso + noCumplidos || 1;
  const segCumplido = (cumplidos / total) * CIRC;
  const segProgreso = (progreso / total) * CIRC;
  const segNoCumplido = (noCumplidos / total) * CIRC;

  return (
    <svg width={size} height={size} viewBox="0 0 132 132">
      <circle cx="66" cy="66" r={R} fill="none" stroke="#EEF1F3" strokeWidth="16" />
      <circle
        cx="66" cy="66" r={R} fill="none" stroke="var(--il-cumplido)" strokeWidth="16"
        strokeDasharray={`${segCumplido} ${CIRC}`} transform="rotate(-90 66 66)"
      />
      <circle
        cx="66" cy="66" r={R} fill="none" stroke="var(--il-progreso)" strokeWidth="16"
        strokeDasharray={`${segProgreso} ${CIRC}`} strokeDashoffset={-segCumplido} transform="rotate(-90 66 66)"
      />
      <circle
        cx="66" cy="66" r={R} fill="none" stroke="var(--il-no-cumplido)" strokeWidth="16"
        strokeDasharray={`${segNoCumplido} ${CIRC}`} strokeDashoffset={-(segCumplido + segProgreso)} transform="rotate(-90 66 66)"
      />
      <text x="66" y="64" textAnchor="middle" fontFamily="Archivo" fontSize="30" fontWeight="700" fill="var(--il-ink)">
        {percent}%
      </text>
      <text x="66" y="82" textAnchor="middle" fontFamily="Archivo" fontSize="10" fill="var(--il-ink-3)">
        {label}
      </text>
    </svg>
  );
}

export function ComplianceRingLegend({ cumplidos, progreso, noCumplidos }) {
  return (
    <div className="il-ring-legend">
      <div className="il-ring-legend__row">
        <span className="il-ring-legend__dot" style={{ background: 'var(--il-cumplido)' }} />
        <span className="il-ring-legend__label">Cumplido</span>
        <span style={{ fontWeight: 600 }}>{cumplidos}</span>
      </div>
      <div className="il-ring-legend__row">
        <span className="il-ring-legend__dot" style={{ background: 'var(--il-progreso)' }} />
        <span className="il-ring-legend__label">En progreso</span>
        <span style={{ fontWeight: 600 }}>{progreso}</span>
      </div>
      <div className="il-ring-legend__row">
        <span className="il-ring-legend__dot" style={{ background: 'var(--il-no-cumplido)' }} />
        <span className="il-ring-legend__label">No cumplido</span>
        <span style={{ fontWeight: 600 }}>{noCumplidos}</span>
      </div>
    </div>
  );
}
