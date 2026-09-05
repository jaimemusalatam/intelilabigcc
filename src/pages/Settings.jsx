import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Tabs } from '../components/Tabs';
import { SectionHeader } from '../components/SectionHeader';
import { Icon } from '../components/icons';
import { Button } from '../components/Button';
import { useRole } from '../context/RoleContext';
import { useOrg } from '../context/OrgContext';
import { useAuditLog } from '../lib/storage';
import { MODULE_GROUPS, PERMISSION_ACTIONS, PERMISSION_MATRIX } from '../data/roles';

const TABS = ['Roles y permisos', 'Organización (Multisede)', 'Historial de auditoría'];

export default function Settings() {
  const [tab, setTab] = useState('Roles y permisos');

  return (
    <>
      <PageHeader title="Configuración" subtitle="Roles y permisos, multisede e historial de auditoría del software" />
      <div className="il-panel">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
        {tab === 'Roles y permisos' && <RolesTab />}
        {tab === 'Organización (Multisede)' && <OrgTab />}
        {tab === 'Historial de auditoría' && <AuditTab />}
      </div>
    </>
  );
}

function RolesTab() {
  const { roleId, roles, setRole, role } = useRole();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <SectionHeader icon="personas">Rol activo (simulación)</SectionHeader>
        <p className="il-text-small" style={{ marginBottom: 10 }}>
          Cambia el rol activo para ver cómo se restringen las acciones sensibles (p. ej. autorizar competencias) según el rol.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className="il-badge"
              style={{
                border: '1px solid ' + (roleId === r.id ? 'var(--il-red)' : 'var(--il-border)'),
                background: roleId === r.id ? 'var(--il-red-soft)' : 'var(--il-surface)',
                color: roleId === r.id ? 'var(--il-no-cumplido-fg)' : 'var(--il-ink-2)',
                cursor: 'pointer',
                height: 32,
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
        <p className="il-text-small" style={{ marginTop: 10 }}>Activo: <strong>{role.label}</strong> — {role.resumen}</p>
      </div>

      <div>
        <SectionHeader icon="config">Matriz de permisos por módulo × acción</SectionHeader>
        <div className="il-table-card" style={{ marginTop: 10 }}>
          <div className="il-table-header-row" style={{ gridTemplateColumns: `1.4fr repeat(${PERMISSION_ACTIONS.length}, 90px)` }}>
            <span>Grupo de módulos</span>
            {PERMISSION_ACTIONS.map((a) => <span key={a} style={{ textTransform: 'capitalize' }}>{a}</span>)}
          </div>
          {MODULE_GROUPS.map((group) => (
            <div key={group} className="il-table-row" style={{ gridTemplateColumns: `1.4fr repeat(${PERMISSION_ACTIONS.length}, 90px)`, cursor: 'default' }}>
              <span style={{ fontWeight: 600 }}>{group}</span>
              {PERMISSION_ACTIONS.map((a) => (
                <span key={a}>
                  {PERMISSION_MATRIX[roleId]?.[group]?.includes(a) ? (
                    <Icon name="checkCircle" size={16} color="var(--il-cumplido)" />
                  ) : (
                    <Icon name="x" size={14} color="var(--il-ink-3)" />
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="il-text-small" style={{ marginTop: 10 }}>
          Los permisos se configuran por módulo, sede, área y acción (ver, crear, editar, aprobar, eliminar, descargar).
        </p>
      </div>
    </div>
  );
}

function OrgTab() {
  const { org, sedeId, sede, setSede, addSede, addArea } = useOrg();
  const [nuevaSede, setNuevaSede] = useState('');
  const [nuevaArea, setNuevaArea] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <SectionHeader icon="edificio">{org.name}</SectionHeader>
        <p className="il-text-small" style={{ marginTop: 6 }}>Organización → Sede → Área. La información puede definirse como corporativa, por sede o por área.</p>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <div className="il-field" style={{ minWidth: 220 }}>
          <label>Sede activa</label>
          <select className="il-input" value={sedeId} onChange={(e) => setSede(e.target.value)}>
            {org.sedes.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <form
          style={{ display: 'flex', gap: 8 }}
          onSubmit={(e) => { e.preventDefault(); if (nuevaSede.trim()) { addSede(nuevaSede.trim()); setNuevaSede(''); } }}
        >
          <input className="il-input" placeholder="Nueva sede…" value={nuevaSede} onChange={(e) => setNuevaSede(e.target.value)} />
          <Button variant="secondary" type="submit"><Icon name="plus" size={15} /> Agregar sede</Button>
        </form>
      </div>

      <div className="il-table-card">
        <div className="il-table-header-row" style={{ gridTemplateColumns: '200px 1fr' }}>
          <span>Sede</span><span>Áreas</span>
        </div>
        {org.sedes.map((s) => (
          <div key={s.id} className="il-table-row" style={{ gridTemplateColumns: '200px 1fr', cursor: 'default' }}>
            <span style={{ fontWeight: 600 }}>{s.name}</span>
            <span className="il-text-small">{s.areas.map((a) => a.name).join(' · ') || 'Sin áreas registradas'}</span>
          </div>
        ))}
      </div>

      <form
        style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}
        onSubmit={(e) => { e.preventDefault(); if (nuevaArea.trim()) { addArea(sedeId, nuevaArea.trim()); setNuevaArea(''); } }}
      >
        <div className="il-field" style={{ flex: 1 }}>
          <label>Nueva área para «{sede?.name}»</label>
          <input className="il-input" value={nuevaArea} onChange={(e) => setNuevaArea(e.target.value)} placeholder="p. ej. Banco de sangre" />
        </div>
        <Button variant="secondary" type="submit"><Icon name="plus" size={15} /> Agregar área</Button>
      </form>
    </div>
  );
}

function AuditTab() {
  const entries = useAuditLog();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p className="il-text-small" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Icon name="candado" size={14} /> Registro de solo lectura: ningún rol puede eliminar el historial de auditoría del software.
      </p>
      <div className="il-table-card">
        <div className="il-table-header-row" style={{ gridTemplateColumns: '110px 130px 1fr 140px 1fr' }}>
          <span>Fecha / hora</span><span>Usuario</span><span>Acción</span><span>Elemento</span><span>Detalle</span>
        </div>
        {entries.length === 0 && <p className="il-text-body" style={{ padding: '18px 20px' }}>Aún no se registraron acciones en esta sesión.</p>}
        {entries.map((e) => (
          <div key={e.id} className="il-table-row" style={{ gridTemplateColumns: '110px 130px 1fr 140px 1fr', cursor: 'default' }}>
            <span className="il-text-meta">{e.fecha} {e.hora}</span>
            <span className="il-text-small">{e.usuario}</span>
            <span>{e.accion}</span>
            <span className="il-text-small">{e.elemento}</span>
            <span className="il-text-meta" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.valorNuevo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
