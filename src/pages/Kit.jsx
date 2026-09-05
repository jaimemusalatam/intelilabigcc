import { useState } from 'react';
import { Icon, ICONS_KIT } from '../components/icons';
import { Button, AuditModeButton } from '../components/Button';
import { StatusBadge, CountBadge, ClauseTag } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { ComplianceRing, ComplianceRingLegend } from '../components/ComplianceRing';
import { ProcessCardExtendida, ProcessCardMetrica, ProcessCardCompacta } from '../components/ProcessCard';
import { NCTable } from '../components/NCTable';
import { Tabs } from '../components/Tabs';
import { SectionHeader } from '../components/SectionHeader';
import { TextField, SelectField, DisplayField, MissingEvidenceField } from '../components/Field';
import { Sidebar } from '../components/Sidebar';
import { NC_LIST } from '../data/mock';

const COLORS = [
  ['Rojo InteliLab', '#D80A1D'], ['Rojo hover', '#B21014'], ['Rojo suave', '#FEF2F3', '#F7C9CE'],
  ['Grafito 900', '#21272D'], ['Grafito 800 · nav', '#2E353D'], ['Grafito 700 · hover', '#3A424B'],
  ['Tinta', '#0F1215'], ['Tinta 2', '#4A525B'], ['Tinta 3', '#8A929B'],
  ['Borde', '#E3E6E9'], ['Lienzo', '#F4F6F7', '#E3E6E9'], ['Superficie', '#FFFFFF', '#E3E6E9'],
];

const STATUS_SWATCHES = [
  { status: 'cumplido', title: 'Cumplido', desc: 'Requisito cerrado con evidencia vigente, o indicador en 90% o más.', spec: '#1B9020 · fondo #EDF7ED' },
  { status: 'progreso', title: 'En progreso', desc: 'Acción abierta dentro de plazo, o indicador entre 70% y 89%.', spec: '#F56016 · fondo #FEF3EA' },
  { status: 'no-cumplido', title: 'No cumplido', desc: 'No conformidad abierta, acción vencida, o indicador por debajo de 70%.', spec: '#D80A1D · fondo #FEF2F3' },
];

const TYPE_SCALE = [
  { name: 'Display', sample: 'Cumplimiento 89%', spec: 'Archivo 700 · 34/1.15', cls: 'il-text-display' },
  { name: 'Título de página', sample: 'Mapa de Procesos ISO 15189:2022', spec: 'Archivo 700 · 24/1.25', cls: 'il-text-h1' },
  { name: 'Título de tarjeta', sample: 'Imparcialidad y Confidencialidad', spec: 'Archivo 600 · 18/1.3', cls: 'il-text-h2' },
  { name: 'Encabezado de sección', sample: '3. PROCESOS DE SOPORTE', spec: 'Archivo 700 · 13 · .08em', cls: 'il-text-section' },
  { name: 'Cuerpo', sample: 'Cada tarjeta abre el detalle del proceso, sus requisitos y evidencias.', spec: 'Archivo 400 · 14/1.5', cls: 'il-text-body' },
  { name: 'Métrica', sample: '96%', spec: 'Archivo 700 · 30 · -0.02em', cls: 'il-text-metric' },
  { name: 'Dato de trazabilidad', sample: 'NC-2026-014 · Cláusula 7.5 · 14/10/2026', spec: "IBM Plex Mono 500 · 11 · .04em", cls: 'il-text-meta' },
];

const RADII = [['4', 4], ['8', 8], ['12', 12], ['full', 999]];
const ELEVATIONS = ['e0', 'e1', 'e2', 'e3'];
const ELEVATION_SHADOW = { e0: 'none', e1: 'var(--il-e1)', e2: 'var(--il-e2)', e3: 'var(--il-e3)' };
const SPACING = [4, 8, 12, 16, 24, 32];

function Num({ n }) {
  return <span className="il-text-meta" style={{ color: 'var(--il-red)' }}>{n}</span>;
}

function SectionTitle({ n, children, hint }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <Num n={n} />
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>{children}</h2>
      {hint && <span className="il-text-small">{hint}</span>}
    </div>
  );
}

export default function Kit() {
  const [tab, setTab] = useState('Requisitos');

  return (
    <div style={{ fontFamily: 'var(--il-font-ui)', color: 'var(--il-ink)', background: 'var(--il-bg)', padding: '48px 40px 96px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 56 }}>
      {/* Portada */}
      <div style={{ width: '100%', maxWidth: 1180, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, paddingBottom: 28, borderBottom: '2px solid var(--il-ink)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="42" height="46" viewBox="0 0 42 46" fill="none" stroke="var(--il-red)" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M21 2.5 38.5 12v22L21 43.5 3.5 34V12z" />
              <path d="M14.5 30.5 27 15.5" strokeLinecap="round" />
              <circle cx="14.5" cy="30.5" r="3" fill="var(--il-red)" />
              <circle cx="27" cy="15.5" r="3" fill="var(--il-red)" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>InteliLab</div>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '0.22em', color: 'var(--il-ink-2)', marginTop: 4 }}>IGCC</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 22, fontWeight: 600 }}>Sistema de diseño</div>
            <div className="il-text-body" style={{ maxWidth: 560 }}>Fundamentos y componentes de la plataforma de gestión y cumplimiento ISO 15189:2022 para laboratorios clínicos.</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }} className="il-text-meta">
          <span style={{ background: 'var(--il-red)', color: '#fff', padding: '3px 8px', borderRadius: 4, fontWeight: 500 }}>v1.0.0</span>
          <span>ISO 15189:2022</span>
          <span>Actualizado 09/2026</span>
        </div>
      </div>

      {/* 01 Color */}
      <section style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SectionTitle n="01" hint="Un solo acento. El resto del color comunica estado de cumplimiento.">Color</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          {COLORS.map(([name, hex, border]) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ height: 76, borderRadius: 8, background: hex, border: border ? `1px solid ${border}` : 'none' }} />
              <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
              <div className="il-text-meta">{hex}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 8 }}>
          {STATUS_SWATCHES.map((s) => (
            <div key={s.status} className="il-card" style={{ padding: 18, gap: 12, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 12, height: 12, borderRadius: 999, background: `var(--il-${s.status})` }} />
                <span style={{ fontSize: 15, fontWeight: 600 }}>{s.title}</span>
              </div>
              <div className="il-text-body">{s.desc}</div>
              <div className="il-text-meta">{s.spec}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 02 Tipografía */}
      <section style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SectionTitle n="02" hint="Archivo para la interfaz. IBM Plex Mono para datos de trazabilidad.">Tipografía</SectionTitle>
        <div className="il-card" style={{ padding: 0 }}>
          {TYPE_SCALE.map((t, i) => (
            <div key={t.name} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 190px', gap: 24, alignItems: 'baseline', padding: '18px 22px', borderBottom: i < TYPE_SCALE.length - 1 ? '1px solid #EEF1F3' : 'none' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
              <div className={t.cls}>{t.sample}</div>
              <div className="il-text-meta" style={{ textAlign: 'right' }}>{t.spec}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 Iconografía */}
      <section style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SectionTitle n="03" hint="Trazo 1.5px, caja de 24px, currentColor. Sin iconos rellenos, sin emoji.">Iconografía</SectionTitle>
        <div className="il-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '20px 12px' }}>
          {ICONS_KIT.map(([label, icon]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--il-graphite-800)' }}>
              <Icon name={icon} size={26} />
              <span style={{ fontSize: 10, color: 'var(--il-ink-3)', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 04 Componentes */}
      <section style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SectionTitle n="04">Componentes</SectionTitle>

        <div className="il-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Botones</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <Button variant="primary">Registrar indicador</Button>
            <Button variant="secondary">Exportar evidencia</Button>
            <Button variant="ghost">Cancelar</Button>
            <Button variant="danger">Cerrar NC</Button>
            <Button variant="primary" disabled>Sin permisos</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 6, borderTop: '1px solid #EEF1F3' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="il-text-small">Acción de contexto — Modo Auditoría</span>
              <AuditModeButton />
            </div>
            <div className="il-text-small" style={{ maxWidth: 320 }}>Único botón de doble línea del sistema. Reservado a Modo Auditoría; no se reutiliza para otras acciones.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="il-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Badges de estado</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <StatusBadge status="cumplido" />
              <StatusBadge status="progreso" />
              <StatusBadge status="no-cumplido" />
              <StatusBadge status="no-aplica" />
              <CountBadge>3 vencidas</CountBadge>
            </div>
            <div className="il-text-small">Contador sólido solo para vencidos. El resto siempre en fondo suave.</div>
          </div>
          <div className="il-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Referencia de cláusula</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <ClauseTag>ISO 15189 · 5</ClauseTag>
              <ClauseTag>Cláusula 7.2</ClauseTag>
              <ClauseTag>Cláusula 8.3 – 8.4</ClauseTag>
              <ClauseTag>NC-2026-014</ClauseTag>
            </div>
            <div className="il-text-small">Toda métrica publicada lleva su cláusula. Monoespaciada para distinguir el dato de trazabilidad del texto de interfaz.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
          <div className="il-card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Barra de cumplimiento</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ProgressBar label="Preanalítico" percent={95} />
              <ProgressBar label="Analítico" percent={82} />
              <ProgressBar label="Gestión de reactivos" percent={64} />
            </div>
            <div className="il-text-small">Altura 6px, radio completo, pista #EEF1F3. El color lo determina el umbral, nunca el autor de la pantalla.</div>
          </div>
          <div className="il-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Anillo general</div>
            <div className="il-ring-wrap">
              <ComplianceRing percent={89} cumplidos={64} progreso={22} noCumplidos={6} />
              <ComplianceRingLegend cumplidos={64} progreso={22} noCumplidos={6} />
            </div>
          </div>
        </div>

        <div className="il-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Tarjeta de proceso</div>
            <span className="il-text-small">Tres densidades: extendida, métrica y compacta.</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'start' }}>
            <ProcessCardExtendida icon="edificio" title="Dirección y Gobierno" clause="Cláusula 4 – 5" percent={96} status="cumplido" />
            <ProcessCardMetrica icon="alerta" title="Riesgos y Planificación" clause="Cláusula 6.1" percent={84} status="progreso" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ProcessCardCompacta icon="personas" title="Personal" clause="Cláusula 6.2" percent={91} status="cumplido" />
              <ProcessCardCompacta icon="matraz" title="Reactivos" clause="Cláusula 6.6" percent={74} status="progreso" />
              <ProcessCardCompacta icon="alerta" title="NC / CAPA" clause="Cláusula 7.5 – 8.7" label="3 vencidas" status="no-cumplido" />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
          <div className="il-panel">
            <SectionHeader icon="barras">Resumen de evaluación</SectionHeader>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ResumenRow label="Cumplidos" value={64} pct={70} />
              <ResumenRow label="En progreso" value={22} pct={24} />
              <ResumenRow label="No cumplidos" value={6} pct={6} />
              <div style={{ display: 'flex', alignItems: 'center', padding: '13px 0 2px' }}>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>Total de requisitos</span>
                <span style={{ fontSize: 17, fontWeight: 700 }}>92</span>
              </div>
            </div>
          </div>
          <NCTable items={NC_LIST} hint="Filas de 48px, cabecera monoespaciada" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="il-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Campos</div>
            <TextField label="Título de la no conformidad" defaultValue="Desviación de temperatura en refrigerador R-04" readOnly />
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}><SelectField label="Cláusula">7.5 Control de registros</SelectField></div>
              <div style={{ width: 150 }}><DisplayField label="Fecha límite" mono>14/10/2026</DisplayField></div>
            </div>
            <MissingEvidenceField />
          </div>
          <div className="il-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Pestañas y encabezado de sección</div>
            <Tabs tabs={['Requisitos', 'Evidencias', 'Indicadores', 'Historial']} active={tab} onChange={setTab} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 4 }}>
              <SectionHeader icon="diana">1. Procesos estratégicos</SectionHeader>
              <SectionHeader icon="config">2. Procesos operativos</SectionHeader>
              <span className="il-text-small">El encabezado de sección numera el proceso, lleva icono en rojo y no compite con el título de página.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 Navegación */}
      <section style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SectionTitle n="05" hint="Dos temas válidos. Un solo ítem activo por vez.">Navegación</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Grafito — trabajo diario</span>
              <span className="il-text-small">jornada larga, menos peso de cromo</span>
            </div>
            <div style={{ borderRadius: 12, overflow: 'hidden', height: 380 }}>
              <Sidebar theme="graphite" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Claro — revisión y proyección</span>
              <span className="il-text-small">sala, actas, captura de pantalla</span>
            </div>
            <div style={{ borderRadius: 12, overflow: 'hidden', height: 380, border: '1px solid var(--il-border)' }}>
              <Sidebar theme="light" />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ border: '1px solid var(--il-red-border)', background: 'var(--il-red-soft)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>¿Listo para una auditoría?</div>
            <div className="il-text-body">Active el Modo Auditoría para una visión completa y la evidencia organizada por cláusula.</div>
            <AuditModeButton compact />
          </div>
          <div className="il-card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Encabezado de página</div>
            <div style={{ border: '1px solid #EEF1F3', borderRadius: 10, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>Mapa de Procesos ISO 15189:2022</span>
                <span className="il-text-small">Sistema inteligente para gestión y cumplimiento</span>
              </div>
              <div style={{ position: 'relative', color: 'var(--il-ink-2)' }}>
                <Icon name="campana" size={21} />
                <span style={{ position: 'absolute', top: -5, right: -6, width: 17, height: 17, borderRadius: 999, background: 'var(--il-red)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>7</span>
              </div>
              <div style={{ width: 1, height: 26, background: 'var(--il-border)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--il-graphite-800)', color: '#fff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JP</div>
                <span className="il-text-small">Usuario</span>
                <Icon name="chevronDown" size={14} color="var(--il-ink-3)" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 Forma y espacio */}
      <section style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SectionTitle n="06">Forma y espacio</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <div className="il-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Radios</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
              {RADII.map(([label, r]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 46, height: 46, background: 'var(--il-bg)', border: '1px solid var(--il-border-strong)', borderRadius: r }} />
                  <span className="il-text-meta">{label}</span>
                </div>
              ))}
            </div>
            <div className="il-text-small">8 para controles, 12 para tarjetas, completo para píldoras.</div>
          </div>
          <div className="il-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Elevación</div>
            <div style={{ display: 'flex', gap: 14 }}>
              {ELEVATIONS.map((e) => (
                <div key={e} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 62, height: 46, background: '#fff', border: e === 'e0' ? '1px solid var(--il-border)' : 'none', borderRadius: 8, boxShadow: ELEVATION_SHADOW[e] }} />
                  <span className="il-text-meta">{e}</span>
                </div>
              ))}
            </div>
            <div className="il-text-small">Las tarjetas viven en e0 con borde; la sombra aparece solo al pasar el cursor.</div>
          </div>
          <div className="il-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="il-text-section" style={{ color: 'var(--il-ink-2)' }}>Espaciado</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              {SPACING.map((s) => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: s, height: 44, background: 'var(--il-red)' }} />
                  <span className="il-text-meta">{s}</span>
                </div>
              ))}
            </div>
            <div className="il-text-small">Escala de 4. 24px entre grupos de tarjetas, 16px dentro del grupo.</div>
          </div>
        </div>
      </section>

      {/* 07 Voz */}
      <section style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SectionTitle n="07" hint="Español formal de laboratorio. Terminología ISO 15189 literal.">Voz</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="il-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: 'var(--il-cumplido)' }}>
              <Icon name="checkCircle" size={16} strokeWidth={2} />Así sí
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <span>«Registrar acción correctiva»</span>
              <span>«3 acciones correctivas vencidas»</span>
              <span>«Evidencia requerida para cerrar el requisito 7.5»</span>
              <span>«Última actualización: 20/05/2026 10:30»</span>
            </div>
          </div>
          <div className="il-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: 'var(--il-red)' }}>
              <Icon name="x" size={16} strokeWidth={2} />Así no
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--il-ink-3)' }}>
              <span>«¡Añade tu acción!»</span>
              <span>«Tienes 3 pendientes por ahí»</span>
              <span>«Ups, falta algo»</span>
              <span>«Hace un rato»</span>
            </div>
          </div>
        </div>
      </section>

      <div style={{ width: '100%', maxWidth: 1180, paddingTop: 24, borderTop: '1px solid var(--il-border)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--il-ink-3)' }}>
        <span>InteliLab IGCC — Plataforma inteligente para laboratorios clínicos</span>
        <span className="il-text-meta">tokens: src/styles/tokens.css · guía: design-system/guide.md</span>
      </div>
    </div>
  );
}

function ResumenRow({ label, value, pct }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', borderBottom: '1px solid #EEF1F3' }}>
      <span style={{ flex: 1, fontSize: 13, color: 'var(--il-ink-2)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, width: 34, textAlign: 'right' }}>{value}</span>
      <span className="il-text-meta" style={{ width: 42, textAlign: 'right' }}>{pct}%</span>
    </div>
  );
}
