import { useState, useEffect } from "react";

// ─── ESTRUCTURA REAL DEL EXCEL ────────────────────────────────────────────
const AREAS = {
  "Paid Media": {
    codigo: "PM", color: "#f97316",
    kpis: [
      { key: "acos",          label: "% Cumplimiento ACOS Objetivo",     obj: 1.0,  tipo: "ratio" },
      { key: "facturacion",   label: "% Facturación Objetivo",            obj: 0.8,  tipo: "ratio" },
      { key: "facturacion80", label: "% Facturación Objetivo 80%",        obj: 1.0,  tipo: "ratio" },
      { key: "gantt",         label: "Cumplimiento de Gantt",             obj: 1.0,  tipo: "ratio" },
      { key: "presupuestos",  label: "Control de presupuestos",           obj: 1.0,  tipo: "ratio" },
      { key: "retencion",     label: "Retención",                        obj: 1.0,  pilar: "retencion" },
      { key: "volumen",       label: "Volumen de cuentas",               obj: 41.0, pilar: "volumen" },
      { key: "wow",           label: "Cumplimiento de WOW",              obj: 1.0,  pilar: "calidad" },
      { key: "cultura",       label: "Cumplimiento de cultura",          obj: 1.0,  pilar: "cultura" },
      { key: "eficiencia",    label: "Ratio de eficiencia",              obj: 7.0,  pilar: "eficiencia" },
      { key: "cualitativos",  label: "Avance de objetivos cualitativos", obj: 11.0, pilar: "cualitativos" },
    ]
  },
  "Social Media": {
    codigo: "SM", color: "#3b82f6",
    kpis: [
      { key: "engagement",   label: "Cumplimiento Engagement Rate",        obj: 1.0,  tipo: "ratio" },
      { key: "seguidores",   label: "Cumplimiento Cantidad de Seguidores", obj: 1.0,  tipo: "ratio" },
      { key: "reportes_pm",  label: "Reportes a Paid sobre promoción",    obj: 1.0,  tipo: "ratio" },
      { key: "gantt",        label: "Cumplimiento del Gantt",             obj: 1.0,  tipo: "ratio" },
      { key: "retencion",    label: "Retención",                         obj: 1.0,  pilar: "retencion" },
      { key: "volumen",      label: "Volumen de cuentas",                obj: 22.0, pilar: "volumen" },
      { key: "wow",          label: "Cumplimiento de WOW",               obj: 1.0,  pilar: "calidad" },
      { key: "cultura",      label: "Cumplimiento de cultura",           obj: 1.0,  pilar: "cultura" },
      { key: "eficiencia",   label: "Ratio de eficiencia",               obj: 7.5,  pilar: "eficiencia" },
      { key: "cualitativos", label: "Avance de objetivos cualitativos",  obj: 1.0,  pilar: "cualitativos" },
    ]
  },
  "Diseño": {
    codigo: "DG", color: "#eab308",
    kpis: [
      { key: "engagement",   label: "Cumplimiento Engagement Rate",      obj: 1.0,   tipo: "ratio" },
      { key: "gantt",        label: "Cumplimiento del Gantt",           obj: 1.0,   tipo: "ratio" },
      { key: "retrabajo",    label: "Porcentaje de Retrabajo",          obj: 0.1,   tipo: "ratio" },
      { key: "calidad",      label: "Nivel de Calidad",                 obj: 0.9,   tipo: "ratio" },
      { key: "retencion",    label: "Retención",                       obj: 1.0,   pilar: "retencion" },
      { key: "volumen",      label: "Volumen de cuentas",              obj: 21.0,  pilar: "volumen" },
      { key: "wow",          label: "Cumplimiento de WOW",             obj: 1.0,   pilar: "calidad" },
      { key: "cultura",      label: "Cumplimiento de cultura",         obj: 1.0,   pilar: "cultura" },
      { key: "eficiencia",   label: "Ratio de eficiencia",             obj: 0.075, pilar: "eficiencia" },
      { key: "cualitativos", label: "Avance de objetivos cualitativos",obj: 1.0,   pilar: "cualitativos" },
    ]
  },
  "Consultoría": {
    codigo: "CMK", color: "#a855f7",
    kpis: [
      { key: "acos",         label: "% Cumplimiento ACOS Objetivo",     obj: 1.0,  tipo: "ratio" },
      { key: "facturacion",  label: "% Facturación Objetivo",           obj: 1.0,  tipo: "ratio" },
      { key: "gantt",        label: "Cumplimiento de Gantt",            obj: 1.0,  tipo: "ratio" },
      { key: "retencion",    label: "Retención",                       obj: 1.0,  pilar: "retencion" },
      { key: "volumen",      label: "Volumen de cuentas",              obj: 17.0, pilar: "volumen" },
      { key: "wow",          label: "Cumplimiento de WOW",             obj: 1.0,  pilar: "calidad" },
      { key: "cultura",      label: "Cumplimiento de cultura",         obj: 1.0,  pilar: "cultura" },
      { key: "eficiencia",   label: "Ratio de eficiencia",             obj: 6.8,  pilar: "eficiencia" },
      { key: "cualitativos", label: "Avance de objetivos cualitativos",obj: 1.0,  pilar: "cualitativos" },
    ]
  },
  "Email Marketing": {
    codigo: "EM", color: "#10b981",
    kpis: [
      { key: "facturacion_asistida", label: "Facturación asistida Objetivo", obj: 1.0,  tipo: "ratio" },
      { key: "reportes_tiempo",      label: "Envío de Reportes en tiempo",   obj: 1.0,  tipo: "ratio" },
      { key: "salud_cuenta",         label: "Salud de la cuenta",            obj: 1.0,  tipo: "ratio" },
      { key: "retencion",    label: "Retención",                            obj: 1.0,  pilar: "retencion" },
      { key: "volumen",      label: "Volumen de cuentas",                   obj: 17.0, pilar: "volumen" },
      { key: "wow",          label: "Cumplimiento de WOW",                  obj: 1.0,  pilar: "calidad" },
      { key: "cultura",      label: "Cumplimiento de cultura",              obj: 1.0,  pilar: "cultura" },
      { key: "eficiencia",   label: "Ratio de eficiencia",                  obj: 80.0, pilar: "eficiencia" },
      { key: "cualitativos", label: "Avance de objetivos cualitativos",     obj: 1.0,  pilar: "cualitativos" },
    ],
    // Datos reales de Febrero 2026 (único área que completó)
    seed: {
      lider: "Zingo", equipo: "Zingo + Nehuen", mes: "Febrero", estado: "enviado",
      timestamp: "2026-02-28T10:00:00Z",
      kpis: {
        facturacion_asistida: { resultado: "0.8",  link: "Link", comentario: "Wanama Kids y Worldteams no completaron sus objetivos." },
        reportes_tiempo:      { resultado: "0.7",  link: "Link", comentario: "" },
        salud_cuenta:         { resultado: "0.9",  link: "Link", comentario: "CTOR bajo en Electroworld y Entreno" },
        retencion:            { resultado: "0.83", link: "Link", comentario: "Baja de Vintti y Liotta" },
        volumen:              { resultado: "15",   link: "Link", comentario: "Baja de Vintti y Liotta" },
        wow:                  { resultado: "1",    link: "Link", comentario: "" },
        cultura:              { resultado: "1",    link: "Link", comentario: "" },
        eficiencia:           { resultado: "60",   link: "Link", comentario: "" },
        cualitativos:         { resultado: "0",    link: "Link", comentario: "Primer mes de objetivos cualitativos nuevos." },
      },
      alertas: [
        { tipo: "Eficiencia", descripcion: "Desbalance de capacidad ociosa. Zingo al 0%, Nehuen cerca del 40%.", severidad: "Alta", accion: "Reunión al regreso de vacaciones para plantear la situación y alinear expectativas de tiempos operativos.", responsable: "Zingo" },
        { tipo: "Volumen",    descripcion: "2 bajas en febrero (Vintti y Liotta). Se esperan altas en marzo-abril.", severidad: "Alta", accion: "Barrido de pain points y acciones proactivas para asegurar retención al 100% en marzo.", responsable: "Zingo" },
        { tipo: "Operativa",  descripcion: "Email Marketing y Paid Media podrían complementarse con mayor alineación.", severidad: "Media", accion: "Reuniones conjuntas acordadas con Boni para potenciar sintonía entre áreas.", responsable: "Zingo/Boni" },
      ]
    }
  },
  "Generación de Contenido": {
    codigo: "GDC", color: "#ec4899",
    kpis: [
      { key: "mensualizados", label: "% de clientes mensualizados",                  obj: 0.8,  tipo: "ratio" },
      { key: "sla",           label: "% entregables dentro del SLA",                 obj: 0.95, tipo: "ratio" },
      { key: "performance",   label: "% piezas que cumplen KPI de performance",      obj: 0.8,  tipo: "ratio" },
      { key: "retencion",     label: "Retención",                                    obj: 1.0,  pilar: "retencion" },
      { key: "volumen",       label: "Volumen de cuentas",                           obj: 1.0,  pilar: "volumen" },
      { key: "wow",           label: "Cumplimiento de WOW",                          obj: 1.0,  pilar: "calidad" },
      { key: "cultura",       label: "Cumplimiento de cultura",                      obj: 1.0,  pilar: "cultura" },
      { key: "eficiencia",    label: "Ratio de eficiencia",                          obj: 100,  pilar: "eficiencia" },
      { key: "cualitativos",  label: "Avance de objetivos cualitativos",             obj: 1.0,  pilar: "cualitativos" },
    ]
  },
  "Cuentas": {
    codigo: "CTA", color: "#f43f5e",
    kpis: [
      { key: "reuniones_leads",   label: "Reuniones con Nuevos Leads",                obj: null, tipo: "ratio" },
      { key: "conversion",        label: "Tasa de Conversión de Leads",               obj: null, tipo: "ratio" },
      { key: "reuniones_estrat",  label: "Reuniones Estratégicas / Informe Q",        obj: 3.0,  tipo: "numero" },
      { key: "farming",           label: "Reuniones de Venta Farming",                obj: 3.0,  tipo: "numero" },
      { key: "procesos",          label: "Procesos estandarizados por Q",             obj: 1.0,  tipo: "numero" },
      { key: "volumen",           label: "Volumen de cuentas",                        obj: 30.0, pilar: "volumen" },
      { key: "wow",               label: "Cumplimiento de WOW",                      obj: 100,  pilar: "calidad" },
      { key: "cultura",           label: "Cumplimiento de cultura",                  obj: 100,  pilar: "cultura" },
      { key: "eficiencia",        label: "Ratio de eficiencia",                      obj: 3.0,  pilar: "eficiencia" },
      { key: "cualitativos",      label: "Avance de objetivos cualitativos",         obj: null, pilar: "cualitativos" },
    ]
  },
  "Planificación & Finanzas": {
    codigo: "PLF", color: "#94a3b8",
    kpis: [
      { key: "kb_estructura",   label: "KB Estructura y comunicación en fecha",      obj: 1.0, tipo: "ratio" },
      { key: "reporting",       label: "Reporting Krab-e Team en fecha",             obj: 1.0, tipo: "ratio" },
      { key: "pl",              label: "P&L y posición en fecha objetivo",           obj: 1.0, tipo: "ratio" },
      { key: "planif_exterior", label: "Planificación exterior, seguimiento mensual",obj: 1.0, tipo: "ratio" },
      { key: "wow",             label: "Cumplimiento de WOW",                       obj: 1.0, pilar: "calidad" },
      { key: "cultura",         label: "Cumplimiento de cultura",                   obj: 1.0, pilar: "cultura" },
      { key: "cualitativos",    label: "Avance de objetivos cualitativos",          obj: 1.0, pilar: "cualitativos" },
    ]
  },
  "Data": {
    codigo: "DAT", color: "#06b6d4",
    kpis: [
      { key: "tickets_pm",   label: "KB: Tickets internos Paid Media",    obj: 1.0, tipo: "ratio" },
      { key: "implementac",  label: "KB: Implementaciones internas",      obj: 1.0, tipo: "ratio" },
      { key: "inkrab",       label: "INKRAB",                             obj: 1.0, tipo: "ratio" },
      { key: "retencion",    label: "Retención Clientes",                 obj: 1.0, pilar: "retencion" },
      { key: "wow",          label: "Cumplimiento de WOW",                obj: 1.0, pilar: "calidad" },
      { key: "cultura",      label: "Cumplimiento de cultura",            obj: 1.0, pilar: "cultura" },
      { key: "eficiencia",   label: "Ratio de eficiencia",               obj: 1.0, pilar: "eficiencia" },
      { key: "cualitativos", label: "Avance de objetivos cualitativos",  obj: 1.0, pilar: "cualitativos" },
    ]
  },
  "Recursos Humanos": {
    codigo: "RRHH", color: "#84cc16",
    kpis: [
      { key: "obj1",         label: "Objetivo específico de área 1",     obj: null, tipo: "ratio" },
      { key: "obj2",         label: "Objetivo específico de área 2",     obj: null, tipo: "ratio" },
      { key: "obj3",         label: "Objetivo específico de área 3",     obj: null, tipo: "ratio" },
      { key: "retencion",    label: "Retención",                         obj: null, pilar: "retencion" },
      { key: "wow",          label: "Cumplimiento de WOW",               obj: null, pilar: "calidad" },
      { key: "cultura",      label: "Cumplimiento de cultura",           obj: null, pilar: "cultura" },
      { key: "cualitativos", label: "Avance de objetivos cualitativos",  obj: null, pilar: "cualitativos" },
    ]
  },
};

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const PESOS = { retencion: 0.20, volumen: 0.40, calidad: 0.20, eficiencia: 0.10, cualitativos: 0.10 };

// ─── SCORING ──────────────────────────────────────────────────────────────
function calcPct(real, obj) {
  const r = parseFloat(real);
  const o = parseFloat(obj);
  if (isNaN(r) || isNaN(o) || o === 0) return null;
  return Math.min(r / o, 1.5);
}

function calcScore(areaName, kpiData) {
  const area = AREAS[areaName];
  if (!area || !kpiData) return null;
  const buckets = { retencion: [], volumen: [], calidad: [], eficiencia: [], cualitativos: [] };
  area.kpis.forEach(k => {
    if (!k.pilar) return;
    const d = kpiData[k.key];
    if (!d || d.resultado === "" || d.resultado === undefined) return;
    const p = calcPct(d.resultado, k.obj);
    if (p !== null) buckets[k.pilar].push(p);
  });
  let total = 0, totalW = 0;
  Object.entries(buckets).forEach(([pilar, vals]) => {
    if (!vals.length) return;
    const avg = Math.min(vals.reduce((a, b) => a + b, 0) / vals.length, 1.2);
    total += avg * PESOS[pilar];
    totalW += PESOS[pilar];
  });
  return totalW > 0 ? total / totalW : null;
}

function semaforo(score) {
  if (score === null || score === undefined) return "nd";
  if (score >= 0.80) return "verde";
  if (score >= 0.60) return "amarillo";
  return "rojo";
}

const SEM = {
  verde:    { bg: "#052e16", border: "#166534", fg: "#4ade80", dot: "#22c55e", emoji: "🟢", label: "VERDE" },
  amarillo: { bg: "#1c1400", border: "#854d0e", fg: "#fbbf24", dot: "#f59e0b", emoji: "🟡", label: "AMARILLO" },
  rojo:     { bg: "#300",    border: "#991b1b", fg: "#f87171", dot: "#ef4444", emoji: "🔴", label: "ROJO" },
  nd:       { bg: "#111827", border: "#374151", fg: "#6b7280", dot: "#4b5563", emoji: "⚪", label: "SIN DATOS" },
};

// ─── PRIMITIVOS UI ─────────────────────────────────────────────────────────
const T = { bg: "#060614", card: "#0c0c20", border: "#16163a", text: "#e2e8f0", muted: "#5a6280", accent: "#f97316" };

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 3px; height: 3px; }
  ::-webkit-scrollbar-track { background: #060614; }
  ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 2px; }
  input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
  input::placeholder, textarea::placeholder { color: #374151; }
  select option { background: #0c0c20; color: #e2e8f0; }
  .row-hover:hover { background: #0f0f28 !important; }
  .nav-item:hover { background: #0f0f28; }
  .area-item:hover { background: #0d0d22 !important; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.25s ease; }
`;

function Score({ val, lg }) {
  const s = semaforo(val);
  const c = SEM[s];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:c.bg, border:`1px solid ${c.border}`, borderRadius:5, padding: lg ? "6px 14px":"3px 9px", fontFamily:"'DM Mono',monospace", fontWeight:600, fontSize: lg ? 15:12, color:c.fg, whiteSpace:"nowrap" }}>
      <span style={{ width:7, height:7, borderRadius:"50%", background:c.dot, flexShrink:0 }} />
      {val !== null && val !== undefined ? Math.round(val*100)+"%" : "—"}
    </span>
  );
}

function Bar({ val, color = T.accent, h = 4 }) {
  const w = Math.min((val||0)*100, 100);
  return (
    <div style={{ background:"#13132e", borderRadius:99, height:h, overflow:"hidden" }}>
      <div style={{ width:`${w}%`, height:"100%", background:color, borderRadius:99, transition:"width .5s ease" }} />
    </div>
  );
}

function Input({ value, onChange, placeholder, type="text", small, style={} }) {
  const [focus, setFocus] = useState(false);
  return (
    <input type={type} value={value??""} onChange={onChange} placeholder={placeholder}
      onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
      style={{ background:"#090918", border:`1px solid ${focus?T.accent:T.border}`, color:T.text, borderRadius:6, padding: small?"4px 8px":"8px 11px", fontSize: small?12:13, outline:"none", width:"100%", fontFamily:"'DM Sans',sans-serif", transition:"border-color .15s", ...style }} />
  );
}

function Sel({ value, onChange, options, small }) {
  return (
    <select value={value} onChange={onChange}
      style={{ background:"#090918", border:`1px solid ${T.border}`, color:T.text, borderRadius:6, padding: small?"4px 8px":"8px 11px", fontSize: small?12:13, outline:"none", width:"100%", fontFamily:"'DM Sans',sans-serif" }}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function Btn({ children, onClick, variant="primary", style={} }) {
  const V = { primary:{bg:T.accent,fg:"#fff",border:"none"}, ghost:{bg:"transparent",fg:T.muted,border:`1px solid ${T.border}`}, green:{bg:"#052e16",fg:"#4ade80",border:"1px solid #166534"}, red:{bg:"#300",fg:"#f87171",border:"1px solid #991b1b"} };
  const v = V[variant];
  return <button onClick={onClick} style={{ background:v.bg, color:v.fg, border:v.border, borderRadius:6, padding:"8px 16px", fontSize:13, cursor:"pointer", fontWeight:600, fontFamily:"'DM Sans',sans-serif", ...style }}>{children}</button>;
}

function Card({ children, style={} }) {
  return <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:16, ...style }}>{children}</div>;
}

function Lbl({ children }) {
  return <div style={{ color:T.muted, fontSize:10, textTransform:"uppercase", letterSpacing:1.3, marginBottom:7, fontWeight:600 }}>{children}</div>;
}

function Tag({ children, color }) {
  return <span style={{ fontSize:9, fontWeight:700, color:color, background:color+"25", borderRadius:3, padding:"2px 6px", textTransform:"uppercase", letterSpacing:.5 }}>{children}</span>;
}

// ─── VISTA LÍDER: FORMULARIO DE CARGA ────────────────────────────────────
function LeaderView({ areaName, mes, data, onSave }) {
  const area = AREAS[areaName];
  const empty = () => {
    const kpis = {};
    area.kpis.forEach(k => { kpis[k.key] = { resultado:"", link:"", comentario:"" }; });
    return { lider:"", equipo:"", kpis, alertas:[], estado:"borrador" };
  };

  const [form, setForm] = useState(() => data || (area.seed && { ...area.seed }) || empty());

  const setKpi = (key, field, val) =>
    setForm(f => ({ ...f, kpis: { ...f.kpis, [key]: { ...f.kpis[key], [field]: val } } }));

  const addAlerta = () =>
    setForm(f => ({ ...f, alertas: [...(f.alertas||[]), { tipo:"Operativa", severidad:"Media", descripcion:"", accion:"", responsable:"" }] }));

  const setAlerta = (i, field, val) =>
    setForm(f => { const a=[...f.alertas]; a[i]={...a[i],[field]:val}; return {...f,alertas:a}; });

  const removeAlerta = (i) =>
    setForm(f => ({ ...f, alertas: f.alertas.filter((_,j)=>j!==i) }));

  const score = calcScore(areaName, form.kpis);
  const sem = semaforo(score);
  const sc = SEM[sem];

  const save = (estado) => {
    const d = { ...form, estado, area:areaName, mes, timestamp:new Date().toISOString() };
    onSave(d);
    setForm(f => ({ ...f, estado }));
  };

  return (
    <div className="fade-in">
      {/* Header del área */}
      <Card style={{ marginBottom:16, borderColor:area.color+"50" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <span style={{ color:area.color, fontFamily:"'DM Mono',monospace", fontWeight:600, fontSize:13 }}>[{area.codigo}]</span>
              <span style={{ color:T.text, fontSize:20, fontWeight:700 }}>{areaName}</span>
              <span style={{ background:"#13132e", color:T.muted, fontSize:11, borderRadius:4, padding:"2px 8px" }}>{mes} 2026</span>
              {form.estado==="validado" && <span style={{ background:"#052e16", color:"#4ade80", fontSize:11, borderRadius:4, padding:"2px 8px" }}>✅ Validado</span>}
              {form.estado==="enviado" && <span style={{ background:"#1c1400", color:"#fbbf24", fontSize:11, borderRadius:4, padding:"2px 8px" }}>📬 Enviado</span>}
              {form.estado==="borrador" && <span style={{ background:"#13132e", color:T.muted, fontSize:11, borderRadius:4, padding:"2px 8px" }}>📝 Borrador</span>}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div><Lbl>Líder</Lbl><Input value={form.lider} onChange={e=>setForm(f=>({...f,lider:e.target.value}))} placeholder="Nombre del líder" /></div>
              <div><Lbl>Equipo</Lbl><Input value={form.equipo} onChange={e=>setForm(f=>({...f,equipo:e.target.value}))} placeholder="Ej: Zingo + Nehuen" /></div>
            </div>
          </div>
          <div style={{ textAlign:"center", marginLeft:24 }}>
            <Lbl>Score calculado</Lbl>
            <Score val={score} lg />
            <div style={{ color:sc.fg, fontSize:11, marginTop:5, fontWeight:600 }}>{sc.label}</div>
          </div>
        </div>
      </Card>

      {/* Tabla de KPIs — réplica exacta del Excel */}
      <Card style={{ marginBottom:16 }}>
        <Lbl>KPIs — {mes} 2026</Lbl>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"#090918" }}>
                {["KPI","Objetivo","Resultado","% Cumplido","Archivo / Link","Comentario"].map(h=>(
                  <th key={h} style={{ padding:"8px 10px", textAlign:"left", color:T.muted, fontSize:10, textTransform:"uppercase", letterSpacing:.9, fontWeight:600, borderBottom:`1px solid ${T.border}`, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {area.kpis.map((k, i) => {
                const d = form.kpis[k.key] || {};
                const pct = calcPct(d.resultado, k.obj);
                const s = semaforo(pct);
                const sc2 = SEM[s];
                return (
                  <tr key={k.key} className="row-hover" style={{ background: i%2===0 ? "#0a0a1c":"#0d0d22", borderBottom:`1px solid ${T.border}20` }}>
                    <td style={{ padding:"9px 10px", fontSize:12, color:T.text, minWidth:200 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        {k.pilar && <Tag color={area.color}>{k.pilar}</Tag>}
                        {k.label}
                      </div>
                    </td>
                    <td style={{ padding:"9px 10px", fontFamily:"'DM Mono',monospace", fontSize:12, color:T.muted, whiteSpace:"nowrap" }}>
                      {k.obj ?? <span style={{color:"#374151"}}>—</span>}
                    </td>
                    <td style={{ padding:"9px 10px", minWidth:90 }}>
                      <Input type="number" small value={d.resultado} onChange={e=>setKpi(k.key,"resultado",e.target.value)} placeholder="0" />
                    </td>
                    <td style={{ padding:"9px 10px", whiteSpace:"nowrap" }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:13, color:sc2.fg }}>
                        {pct!==null ? Math.round(pct*100)+"%" : <span style={{color:"#374151"}}>—</span>}
                      </span>
                    </td>
                    <td style={{ padding:"9px 10px", minWidth:140 }}>
                      <Input small value={d.link} onChange={e=>setKpi(k.key,"link",e.target.value)} placeholder="Link..." />
                    </td>
                    <td style={{ padding:"9px 10px", minWidth:220 }}>
                      <Input small value={d.comentario} onChange={e=>setKpi(k.key,"comentario",e.target.value)} placeholder="Comentario..." />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Alertas */}
      <Card style={{ marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <Lbl>Alertas</Lbl>
          <Btn onClick={addAlerta} variant="ghost" style={{ padding:"5px 12px", fontSize:12 }}>+ Agregar alerta</Btn>
        </div>
        {(!form.alertas || form.alertas.length===0) && (
          <div style={{ color:T.muted, fontSize:13, textAlign:"center", padding:"20px 0" }}>Sin alertas este mes — ¡buena señal! 🟢</div>
        )}
        {(form.alertas||[]).map((a,i)=>(
          <div key={i} style={{ background:"#090918", border:`1px solid ${T.border}`, borderLeft:`3px solid ${{Alta:"#ef4444",Media:"#f59e0b",Baja:"#6b7280"}[a.severidad]||T.muted}`, borderRadius:"0 8px 8px 0", padding:14, marginBottom:10 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto", gap:10, marginBottom:10, alignItems:"end" }}>
              <div><Lbl>Tipo</Lbl>
                <Sel value={a.tipo} onChange={e=>setAlerta(i,"tipo",e.target.value)} small options={[{value:"Operativa",label:"Operativa"},{value:"Cuentas",label:"Cuentas"},{value:"Recurso",label:"Recurso"},{value:"Eficiencia",label:"Eficiencia"},{value:"Volumen",label:"Volumen"},{value:"Otro",label:"Otro"}]} />
              </div>
              <div><Lbl>Severidad</Lbl>
                <Sel value={a.severidad} onChange={e=>setAlerta(i,"severidad",e.target.value)} small options={[{value:"Alta",label:"🔴 Alta"},{value:"Media",label:"🟡 Media"},{value:"Baja",label:"⚪ Baja"}]} />
              </div>
              <div><Lbl>Responsable</Lbl>
                <Input value={a.responsable} onChange={e=>setAlerta(i,"responsable",e.target.value)} placeholder="Nombre" small />
              </div>
              <button onClick={()=>removeAlerta(i)} style={{ background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:16, padding:"0 4px", marginTop:16 }}>✕</button>
            </div>
            <div style={{ marginBottom:8 }}>
              <Lbl>Descripción</Lbl>
              <Input value={a.descripcion} onChange={e=>setAlerta(i,"descripcion",e.target.value)} placeholder="¿Qué está pasando?" />
            </div>
            <div><Lbl>Acción correctiva</Lbl>
              <Input value={a.accion} onChange={e=>setAlerta(i,"accion",e.target.value)} placeholder="¿Qué se va a hacer?" />
            </div>
          </div>
        ))}
      </Card>

      {/* Acciones */}
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
        <Btn onClick={()=>save("borrador")} variant="ghost">Guardar borrador</Btn>
        <Btn onClick={()=>save("enviado")} variant="primary">✓ Enviar a Planificación</Btn>
      </div>
    </div>
  );
}

// ─── VISTA PLANIFICACIÓN: CONSOLIDADO + VALIDACIÓN ───────────────────────
function PlanView({ reports, mes, onValidate }) {
  const [selected, setSelected] = useState(null);
  const areaNames = Object.keys(AREAS);

  const pendientes = areaNames.filter(a => reports[`${a}_${mes}`]?.estado === "enviado").length;
  const validados  = areaNames.filter(a => reports[`${a}_${mes}`]?.estado === "validado").length;
  const sinReporte = areaNames.filter(a => !reports[`${a}_${mes}`]).length;

  return (
    <div className="fade-in" style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:16 }}>
      {/* Panel izquierdo: consolidado */}
      <div>
        <Card style={{ marginBottom:12 }}>
          <div style={{ color:T.accent, fontWeight:700, fontSize:15, marginBottom:10 }}>Consolidado {mes}</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:12 }}>
            {[
              { l:"Pendientes", v:pendientes, color:"#fbbf24" },
              { l:"Validados", v:validados, color:"#4ade80" },
              { l:"Sin reporte", v:sinReporte, color:T.muted },
            ].map(k=>(
              <div key={k.l} style={{ background:"#090918", borderRadius:6, padding:"8px 10px", textAlign:"center" }}>
                <div style={{ color:k.color, fontSize:22, fontWeight:700, fontFamily:"'DM Mono',monospace" }}>{k.v}</div>
                <div style={{ color:T.muted, fontSize:10, marginTop:2 }}>{k.l}</div>
              </div>
            ))}
          </div>
          {pendientes > 0 && (
            <div style={{ background:"#1c1400", border:"1px solid #854d0e", borderRadius:6, padding:"8px 10px", color:"#fbbf24", fontSize:12 }}>
              ⚠️ {pendientes} reporte{pendientes>1?"s":""} esperando validación
            </div>
          )}
        </Card>

        {areaNames.map(name => {
          const area = AREAS[name];
          const key = `${name}_${mes}`;
          const r = reports[key];
          const score = r ? calcScore(name, r.kpis) : null;
          const s = semaforo(score);
          const sc = SEM[s];
          const isActive = selected === name;
          return (
            <div key={name} onClick={()=>setSelected(r ? name : null)} className="area-item"
              style={{ padding:"10px 12px", borderRadius:8, marginBottom:5, cursor:r?"pointer":"default", background: isActive?"#0f0f28":T.card, border:`1px solid ${isActive ? area.color : T.border}`, transition:"all .15s" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background: r ? sc.dot : "#374151", flexShrink:0 }} />
                  <div>
                    <span style={{ color: isActive ? T.text : "#cbd5e1", fontSize:13, fontWeight:600 }}>{name}</span>
                    {r?.lider && <span style={{ color:T.muted, fontSize:11, marginLeft:6 }}>— {r.lider}</span>}
                  </div>
                </div>
                {r ? <Score val={score} /> : <span style={{ color:"#374151", fontSize:11 }}>Sin reporte</span>}
              </div>
              {r && (
                <div style={{ marginTop:4, fontSize:10, color: r.estado==="validado"?"#4ade80": r.estado==="enviado"?"#fbbf24":T.muted, marginLeft:12 }}>
                  {r.estado==="validado"?"✅ Validado": r.estado==="enviado"?"📬 Enviado — pendiente de validar":"📝 Borrador"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Panel derecho: detalle */}
      <div>
        {!selected && (
          <Card style={{ padding:"60px 40px", textAlign:"center" }}>
            <div style={{ fontSize:32, marginBottom:10 }}>📋</div>
            <div style={{ color:T.muted, fontSize:14 }}>Seleccioná un área para revisar su reporte</div>
            <div style={{ color:"#374151", fontSize:12, marginTop:6 }}>Solo se muestran las áreas que ya enviaron</div>
          </Card>
        )}
        {selected && (() => {
          const r = reports[`${selected}_${mes}`];
          const area = AREAS[selected];
          const score = calcScore(selected, r.kpis);
          const s = semaforo(score);
          const sc = SEM[s];
          return (
            <div className="fade-in">
              <Card style={{ marginBottom:12, borderColor:area.color+"40" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ color:area.color, fontFamily:"'DM Mono',monospace", fontSize:12 }}>[{area.codigo}]</span>
                      <span style={{ color:T.text, fontSize:18, fontWeight:700 }}>{selected}</span>
                    </div>
                    <div style={{ color:T.muted, fontSize:12 }}>
                      Líder: <strong style={{color:T.text}}>{r.lider||"—"}</strong> · Equipo: {r.equipo||"—"} · Enviado: {r.timestamp ? new Date(r.timestamp).toLocaleDateString("es-AR") : "—"}
                    </div>
                  </div>
                  <Score val={score} lg />
                </div>
              </Card>

              {/* KPI review table */}
              <Card style={{ marginBottom:12 }}>
                <Lbl>KPIs reportados</Lbl>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:"#090918" }}>
                      {["KPI","Objetivo","Resultado","% Cumplido","Comentario"].map(h=>(
                        <th key={h} style={{ padding:"7px 10px", textAlign:"left", color:T.muted, fontSize:10, textTransform:"uppercase", letterSpacing:.9, fontWeight:600, borderBottom:`1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {area.kpis.map((k,i)=>{
                      const d = r.kpis[k.key]||{};
                      const pct = calcPct(d.resultado, k.obj);
                      const sc2 = SEM[semaforo(pct)];
                      return (
                        <tr key={k.key} style={{ background:i%2===0?"#0a0a1c":"#0d0d22", borderBottom:`1px solid ${T.border}20` }}>
                          <td style={{ padding:"8px 10px", fontSize:12, color:T.text }}>
                            {k.pilar && <Tag color={area.color}>{k.pilar}</Tag>} {k.label}
                          </td>
                          <td style={{ padding:"8px 10px", fontFamily:"'DM Mono',monospace", fontSize:12, color:T.muted }}>{k.obj??<span style={{color:"#374151"}}>—</span>}</td>
                          <td style={{ padding:"8px 10px", fontFamily:"'DM Mono',monospace", fontSize:13, color:T.text, fontWeight:600 }}>{d.resultado||<span style={{color:"#374151"}}>—</span>}</td>
                          <td style={{ padding:"8px 10px", fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:sc2.fg }}>{pct!==null ? Math.round(pct*100)+"%" : <span style={{color:"#374151"}}>—</span>}</td>
                          <td style={{ padding:"8px 10px", fontSize:11, color:T.muted }}>{d.comentario||"—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>

              {/* Alertas */}
              {r.alertas?.length > 0 && (
                <Card style={{ marginBottom:12 }}>
                  <Lbl>Alertas del área</Lbl>
                  {r.alertas.map((a,i)=>(
                    <div key={i} style={{ background:"#090918", borderRadius:6, borderLeft:`3px solid ${{Alta:"#ef4444",Media:"#f59e0b",Baja:"#6b7280"}[a.severidad]||T.muted}`, padding:"10px 14px", marginBottom:8 }}>
                      <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:5 }}>
                        <span style={{ color:{Alta:"#ef4444",Media:"#f59e0b",Baja:"#9ca3af"}[a.severidad], fontSize:11, fontWeight:700, textTransform:"uppercase" }}>{a.severidad}</span>
                        <span style={{ color:T.muted, fontSize:11 }}>{a.tipo}</span>
                        <span style={{ color:T.muted, fontSize:11 }}>·</span>
                        <span style={{ color:T.muted, fontSize:11 }}>{a.responsable}</span>
                      </div>
                      <div style={{ color:T.text, fontSize:13, marginBottom:5 }}>{a.descripcion}</div>
                      {a.accion && <div style={{ color:"#6ee7b7", fontSize:12 }}>→ {a.accion}</div>}
                    </div>
                  ))}
                </Card>
              )}

              {/* Acciones planificación */}
              {r.estado !== "validado" ? (
                <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                  <Btn onClick={()=>{ onValidate(selected, mes, "observado"); }} variant="ghost">Pedir revisión al líder</Btn>
                  <Btn onClick={()=>{ onValidate(selected, mes, "validado"); setSelected(null); }} variant="green">✓ Validar y aprobar reporte</Btn>
                </div>
              ) : (
                <div style={{ textAlign:"right", color:"#4ade80", fontSize:13, fontWeight:600 }}>✅ Reporte validado por Planificación</div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ─── VISTA DIRECCIÓN ──────────────────────────────────────────────────────
function DirView({ reports, mes }) {
  const areaNames = Object.keys(AREAS);
  const rows = areaNames.map(name => {
    const r = reports[`${name}_${mes}`];
    const score = r ? calcScore(name, r.kpis) : null;
    return { name, r, score, area: AREAS[name] };
  });
  const conDatos = rows.filter(x => x.score !== null);
  const agencia = conDatos.length ? conDatos.reduce((a,b)=>a+b.score,0)/conDatos.length : null;
  const rojas = rows.filter(x => semaforo(x.score)==="rojo");
  const todasAlertas = rows.flatMap(x => (x.r?.alertas||[]).map(a=>({...a, area:x.name, aColor:x.area.color})));
  const alertasAltas = todasAlertas.filter(a=>a.severidad==="Alta");

  return (
    <div className="fade-in">
      {/* KPIs top */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {[
          { l:"Score Agencia", v: agencia!==null ? Math.round(agencia*100)+"%" : "--", color: agencia ? SEM[semaforo(agencia)].dot : T.muted },
          { l:"Áreas Validadas", v:`${rows.filter(x=>x.r?.estado==="validado").length}/${areaNames.length}`, color:"#4ade80" },
          { l:"Áreas en Rojo", v:rojas.length, color:rojas.length>0?"#ef4444":"#4ade80" },
          { l:"Alertas Altas", v:alertasAltas.length, color:alertasAltas.length>0?"#ef4444":"#4ade80" },
        ].map(k=>(
          <Card key={k.l}>
            <Lbl>{k.l}</Lbl>
            <div style={{ color:k.color, fontSize:26, fontWeight:700, fontFamily:"'DM Mono',monospace" }}>{k.v}</div>
          </Card>
        ))}
      </div>

      {/* Alertas críticas */}
      {alertasAltas.length > 0 && (
        <div style={{ background:"#1a0000", border:"1px solid #7f1d1d", borderRadius:10, padding:"12px 16px", marginBottom:16 }}>
          <div style={{ color:"#ef4444", fontWeight:700, fontSize:13, marginBottom:10 }}>⚠️ ALERTAS CRÍTICAS ({alertasAltas.length})</div>
          {alertasAltas.map((a,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"120px 1fr 1fr", gap:12, padding:"7px 0", borderTop:`1px solid #300`, fontSize:12, alignItems:"start" }}>
              <span style={{ color:a.aColor, fontWeight:700 }}>{a.area}</span>
              <span style={{ color:"#fca5a5" }}>{a.descripcion}</span>
              <span style={{ color:"#6ee7b7" }}>→ {a.accion}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tabla de scores */}
      <Card style={{ marginBottom:16 }}>
        <Lbl>Score por Área — {mes} 2026</Lbl>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {rows.sort((a,b)=>(b.score??-1)-(a.score??-1)).map(({name, score, r, area})=>{
            const s = semaforo(score);
            const sc = SEM[s];
            return (
              <div key={name} style={{ display:"grid", gridTemplateColumns:"160px 1fr 90px 130px", gap:14, alignItems:"center", padding:"12px 14px", borderRadius:8, background:`${sc.bg}70`, border:`1px solid ${sc.border}25` }}>
                <div>
                  <span style={{ color:area.color, fontFamily:"'DM Mono',monospace", fontSize:11 }}>{area.codigo}</span>
                  <span style={{ color:T.text, fontSize:13, fontWeight:600, marginLeft:6 }}>{name}</span>
                  {r?.lider && <div style={{ color:T.muted, fontSize:11, marginTop:2 }}>👤 {r.lider}</div>}
                </div>
                <div>
                  <Bar val={score} color={sc.dot} h={5} />
                  {r?.alertas?.filter(a=>a.severidad==="Alta").slice(0,1).map((a,i)=>(
                    <div key={i} style={{ color:"#fca5a5", fontSize:10, marginTop:3 }}>⚠️ {a.descripcion.slice(0,60)}…</div>
                  ))}
                </div>
                <Score val={score} />
                <div style={{ textAlign:"right", fontSize:11 }}>
                  {!r && <span style={{ color:"#374151" }}>Sin reporte</span>}
                  {r?.estado==="borrador"  && <span style={{ color:T.muted }}>📝 Borrador</span>}
                  {r?.estado==="enviado"   && <span style={{ color:"#fbbf24" }}>📬 Pendiente</span>}
                  {r?.estado==="validado"  && <span style={{ color:"#4ade80" }}>✅ Validado</span>}
                  {r?.estado==="observado" && <span style={{ color:"#fb923c" }}>🔁 En revisión</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Todas las alertas */}
      {todasAlertas.length > 0 && (
        <Card>
          <Lbl>Todas las alertas — {mes} 2026</Lbl>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"#090918" }}>
                {["Área","Tipo","Severidad","Descripción","Acción","Responsable"].map(h=>(
                  <th key={h} style={{ padding:"7px 10px", textAlign:"left", color:T.muted, fontSize:10, textTransform:"uppercase", letterSpacing:.8, fontWeight:600, borderBottom:`1px solid ${T.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {todasAlertas.sort((a,b)=>a.severidad==="Alta"?-1:b.severidad==="Alta"?1:0).map((a,i)=>(
                <tr key={i} style={{ background:i%2===0?"#0a0a1c":"#0d0d22", borderBottom:`1px solid ${T.border}15` }}>
                  <td style={{ padding:"8px 10px", color:a.aColor, fontSize:12, fontWeight:700 }}>{a.area}</td>
                  <td style={{ padding:"8px 10px", color:T.muted, fontSize:12 }}>{a.tipo}</td>
                  <td style={{ padding:"8px 10px", fontSize:12, fontWeight:700, color:{Alta:"#f87171",Media:"#fbbf24",Baja:T.muted}[a.severidad] }}>{a.severidad}</td>
                  <td style={{ padding:"8px 10px", color:T.text, fontSize:12 }}>{a.descripcion}</td>
                  <td style={{ padding:"8px 10px", color:"#6ee7b7", fontSize:12 }}>{a.accion}</td>
                  <td style={{ padding:"8px 10px", color:T.muted, fontSize:12 }}>{a.responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

// ─── APP PRINCIPAL ─────────────────────────────────────────────────────────
export default function KOS() {
  const [mes, setMes] = useState("Febrero");
  const [view, setView] = useState("dir");       // dir | plan | lider
  const [activeArea, setActiveArea] = useState(null);

  // Storage persistente
  const [reports, setReports] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = localStorage.getItem("kos_v3");
        if (saved) return JSON.parse(saved);
      }
    } catch {}
    // Carga seed de Email Marketing (único área con datos en el Excel)
    const seed = {};
    const emSeed = AREAS["Email Marketing"].seed;
    if (emSeed) seed[`Email Marketing_${emSeed.mes}`] = { ...emSeed, area:"Email Marketing" };
    return seed;
  });

  useEffect(() => {
    try { if (typeof window !== "undefined" && window.localStorage) { localStorage.setItem("kos_v3", JSON.stringify(reports)); } } catch {}
  }, [reports]);

  const saveReport = (data) => {
    setReports(p => ({ ...p, [`${data.area}_${data.mes}`]: data }));
  };

  const validateReport = (areaName, mes, estado) => {
    const key = `${areaName}_${mes}`;
    setReports(p => ({ ...p, [key]: { ...p[key], estado, validado_at: new Date().toISOString() } }));
  };

  const areaNames = Object.keys(AREAS);
  const pendientes = areaNames.filter(a => reports[`${a}_${mes}`]?.estado==="enviado").length;

  return (
    <>
      <style>{css}</style>
      <div style={{ background:T.bg, minHeight:"100vh", color:T.text, fontFamily:"'DM Sans',sans-serif" }}>

        {/* Top bar */}
        <div style={{ background:"#090918", borderBottom:`1px solid ${T.accent}30`, height:54, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:22 }}>🦀</span>
            <span style={{ color:T.accent, fontWeight:700, letterSpacing:1.5, fontFamily:"'DM Mono',monospace", fontSize:15 }}>KOS</span>
            <span style={{ color:"#1e1e4a", fontSize:18 }}>|</span>
            <span style={{ color:T.muted, fontSize:13 }}>Krab-e Operating System</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            {MESES.slice(0,4).map(m=>(
              <button key={m} onClick={()=>setMes(m)}
                style={{ padding:"4px 13px", borderRadius:5, border:"none", cursor:"pointer", fontSize:12, fontWeight:600, background:mes===m?T.accent:"#13132e", color:mes===m?"#fff":T.muted, fontFamily:"'DM Sans',sans-serif", transition:"all .15s" }}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"210px 1fr", minHeight:"calc(100vh - 54px)" }}>
          {/* Sidebar */}
          <div style={{ background:"#090918", borderRight:`1px solid ${T.border}`, padding:"14px 0", overflowY:"auto" }}>
            {[
              { id:"dir",  label:"Dirección",    icon:"⬡" },
              { id:"plan", label:"Planificación", icon:"◈", badge: pendientes > 0 ? pendientes : null },
            ].map(item=>(
              <div key={item.id} onClick={()=>{ setView(item.id); setActiveArea(null); }} className="nav-item"
                style={{ padding:"10px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", borderLeft:`2px solid ${view===item.id && !activeArea ? T.accent:"transparent"}`, background: view===item.id && !activeArea ? "#0f0f28":"transparent" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ color: view===item.id && !activeArea ? T.accent : T.muted, fontSize:14 }}>{item.icon}</span>
                  <span style={{ color: view===item.id && !activeArea ? T.text : T.muted, fontSize:13, fontWeight:600 }}>{item.label}</span>
                </div>
                {item.badge && <span style={{ background:"#f97316", color:"#fff", fontSize:10, fontWeight:700, borderRadius:99, padding:"1px 7px" }}>{item.badge}</span>}
              </div>
            ))}

            <div style={{ padding:"12px 16px 6px", borderTop:`1px solid ${T.border}`, marginTop:8 }}>
              <div style={{ color:T.muted, fontSize:10, textTransform:"uppercase", letterSpacing:1.2, marginBottom:8, fontWeight:600 }}>Carga por área</div>
              {areaNames.map(name=>{
                const area = AREAS[name];
                const r = reports[`${name}_${mes}`];
                const score = r ? calcScore(name, r.kpis) : null;
                const sc = SEM[semaforo(score)];
                const isActive = activeArea===name;
                return (
                  <div key={name} onClick={()=>{ setActiveArea(name); setView("lider"); }} className="area-item"
                    style={{ padding:"8px 10px", cursor:"pointer", borderRadius:7, marginBottom:2, background:isActive?"#0f0f28":"transparent", border:`1px solid ${isActive?area.color:"transparent"}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background: r ? sc.dot : "#374151", flexShrink:0 }} />
                        <span style={{ color: isActive ? T.text : "#94a3b8", fontSize:12 }}>{name}</span>
                      </div>
                      <span style={{ color:area.color, fontFamily:"'DM Mono',monospace", fontSize:9, fontWeight:600 }}>{area.codigo}</span>
                    </div>
                    {r && <div style={{ fontSize:9, marginLeft:10, marginTop:2, color: r.estado==="validado"?"#4ade80": r.estado==="enviado"?"#fbbf24": r.estado==="observado"?"#fb923c":T.muted }}>
                      {r.estado==="validado"?"✅ Validado": r.estado==="enviado"?"📬 Enviado": r.estado==="observado"?"🔁 Revisión":"📝 Borrador"}
                    </div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div style={{ padding:20, overflowY:"auto", maxHeight:"calc(100vh - 54px)" }}>
            <div style={{ marginBottom:18 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
                <h1 style={{ color:T.text, fontSize:20, fontWeight:700 }}>
                  {view==="dir"  && "Vista Dirección"}
                  {view==="plan" && "Planificación — Validación de Reportes"}
                  {view==="lider" && activeArea && `Reporte — ${activeArea}`}
                </h1>
                {view==="lider" && activeArea && reports[`${activeArea}_${mes}`]?.estado==="observado" && (
                  <span style={{ background:"#431407", color:"#fb923c", fontSize:12, borderRadius:4, padding:"2px 8px" }}>🔁 Planificación pidió revisión</span>
                )}
              </div>
              <p style={{ color:T.muted, fontSize:12, marginTop:3 }}>
                {mes} 2026 · Q1 FY26
                {view==="lider" && activeArea && ` · ${AREAS[activeArea].codigo}`}
              </p>
            </div>

            {view==="dir"  && <DirView reports={reports} mes={mes} />}
            {view==="plan" && <PlanView reports={reports} mes={mes} onValidate={validateReport} />}
            {view==="lider" && activeArea && (
              <LeaderView
                key={`${activeArea}_${mes}`}
                areaName={activeArea}
                mes={mes}
                data={reports[`${activeArea}_${mes}`]}
                onSave={saveReport}
              />
            )}
            {view==="lider" && !activeArea && (
              <Card style={{ padding:"60px 40px", textAlign:"center" }}>
                <div style={{ color:T.muted }}>Seleccioná un área en el menú</div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
