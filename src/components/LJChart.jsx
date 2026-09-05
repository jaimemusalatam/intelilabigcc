// Gráfica Levey-Jennings simple en SVG: media, ±1DE, ±2DE, ±3DE y puntos de
// control diarios. Sin librerías externas, consistente con el resto del
// sistema de iconos/diseño (SVG a mano).
const WIDTH = 560;
const HEIGHT = 220;
const PAD = 28;

export function LJChart({ prueba, media, de, puntos }) {
  const bands = [3, 2, 1, 0, -1, -2, -3];
  const yFor = (sd) => HEIGHT / 2 - (sd / 3) * (HEIGHT / 2 - PAD);
  const xFor = (i) => PAD + (i * (WIDTH - PAD * 2)) / (puntos.length - 1);

  const points = puntos.map((v, i) => {
    const sd = (v - media) / de;
    return { x: xFor(i), y: yFor(Math.max(-3.2, Math.min(3.2, sd))), value: v, out: Math.abs(sd) > 3 };
  });

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="il-text-small" style={{ fontWeight: 600, color: 'var(--il-ink)' }}>
        {prueba} — media {media}, DE {de}
      </span>
      <svg width="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Gráfica Levey-Jennings de ${prueba}`}>
        {bands.map((sd) => (
          <g key={sd}>
            <line x1={PAD} x2={WIDTH - PAD} y1={yFor(sd)} y2={yFor(sd)} stroke={sd === 0 ? 'var(--il-ink-3)' : '#E3E6E9'} strokeDasharray={sd === 0 ? undefined : '4 3'} strokeWidth={sd === 0 ? 1.5 : 1} />
            <text x={4} y={yFor(sd) + 4} fontSize="9" fill="var(--il-ink-3)">{sd > 0 ? `+${sd}DE` : sd === 0 ? 'x̄' : `${sd}DE`}</text>
          </g>
        ))}
        <path d={path} fill="none" stroke="var(--il-red)" strokeWidth="1.6" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill={p.out ? 'var(--il-no-cumplido)' : 'var(--il-graphite-800)'} />
        ))}
      </svg>
    </div>
  );
}
