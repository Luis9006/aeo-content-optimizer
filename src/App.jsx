import { useState } from "react";

const COLORS = {
  orange: "#FF7A59",
  teal: "#00BDA5",
  navy: "#1C3A56",
  slate: "#516F90",
  light: "#F5F8FA",
  border: "#DFE3EB",
  text: "#33475B",
  green: "#00A4A6",
  red: "#F2545B",
  yellow: "#F5C26B",
};

const STEPS = [
  "Tu párrafo",
  "Diagnóstico",
  "Reescritura",
  "Antes / Después",
];

const DIAGNOSIS_ITEMS = [
  {
    id: "entity",
    pilar: "Pilar 1",
    label: "Entidad nombrada explícita",
    question: "¿El párrafo menciona el nombre exacto de tu marca, producto, servicio o persona?",
    hint: 'Busca nombres propios específicos. "Nuestra plataforma" o "nuestra solución" NO cuentan — necesitas el nombre real.',
    guidanceIfNo: [
      'Reemplaza "nuestra plataforma" o "nuestra solución" por el nombre exacto de tu marca o producto.',
      'Especifica el tipo de empresa, industria o cargo al que te diriges en lugar de decir "nuestros clientes".',
      "Asegúrate de que el nombre aparezca al menos una vez en el fragmento.",
    ],
  },
  {
    id: "triple",
    pilar: "Pilar 1",
    label: "Tripleta semántica",
    question: "¿El párrafo contiene al menos una afirmación con sujeto + verbo de acción + resultado medible?",
    hint: 'Ejemplo correcto: "[Marca] automatiza [proceso] reduciendo [métrica] en un [%]". Evita verbos vagos como "ayuda a", "mejora" o "potencia" sin resultado concreto.',
    guidanceIfNo: [
      "Identifica la afirmación más importante del párrafo.",
      "Reestructúrala en tres partes: ¿quién? → ¿qué hace exactamente? → ¿con qué resultado medible?",
      'Añade una cifra o resultado concreto. Si no tienes dato exacto, usa rangos ("entre X y Y") o resultados cualitativos específicos.',
    ],
  },
  {
    id: "heading",
    pilar: "Pilar 2",
    label: "Encabezado descriptivo",
    question: "¿El encabezado de esta sección describe con precisión la pregunta que responde el contenido?",
    hint: 'Un encabezado como "Beneficios" o "Más información" no le dice nada a la IA. Debe describir la pregunta que responde: "Cómo [marca] reduce el tiempo de [proceso]" es un encabezado que la IA puede identificar y citar.',
    guidanceIfNo: [
      'Reescribe el encabezado como una pregunta o una afirmación que describa exactamente qué aprenderá o encontrará quien lea esta sección.',
      'Evita encabezados genéricos como "Ventajas", "Características" o "Solución". Sé específico: ¿qué problema resuelve? ¿para quién?',
      "Incluye el nombre de tu marca o producto en el encabezado cuando sea relevante para la búsqueda.",
    ],
  },
  {
    id: "autonomous",
    pilar: "Pilar 2",
    label: "Fragmento autónomo",
    question: "¿Este párrafo se entiende completamente solo, sin necesidad de leer el resto del artículo?",
    hint: 'Imagina que alguien lee SOLO este fragmento. ¿Sabe de qué marca se habla? ¿Entiende qué hace y con qué impacto? Si dice "como mencionamos antes" o depende de contexto anterior, no es autónomo.',
    guidanceIfNo: [
      'Elimina frases que hagan referencia a lo anterior: "como vimos", "siguiendo con lo anterior", "en el punto anterior".',
      "Reescribe la apertura para que contenga toda la información necesaria sin depender de otro párrafo.",
      "Asegúrate de que el nombre de la entidad aparezca en este fragmento, no solo en una sección anterior.",
    ],
  },
];

function generateHTML(headingText, originalText, diagnosis, rewrittenText) {
  const diagnosisRows = DIAGNOSIS_ITEMS.map((item) => {
    const answer = diagnosis[item.id];
    const status = answer === true ? "✅ Sí" : answer === false ? "❌ No" : "—";
    return `<tr>
      <td style="padding:8px 12px;border:1px solid #DFE3EB;font-weight:600;color:#1C3A56;">${item.pilar}</td>
      <td style="padding:8px 12px;border:1px solid #DFE3EB;">${item.label}</td>
      <td style="padding:8px 12px;border:1px solid #DFE3EB;text-align:center;">${status}</td>
    </tr>`;
  }).join("");

  const passedCount = DIAGNOSIS_ITEMS.filter(i => diagnosis[i.id] === true).length;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<title>Optimizador de contenido para AEO — Resultado</title>
<style>
  body { font-family: sans-serif; color: #33475B; max-width: 800px; margin: 0 auto; padding: 40px 24px; }
  .header { background: #1C3A56; color: white; padding: 24px 32px; border-radius: 8px; margin-bottom: 32px; }
  .badge { background: #FF7A59; color: white; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 4px 10px; border-radius: 4px; display: inline-block; margin-bottom: 8px; }
  h1 { margin: 0; font-size: 22px; }
  h2 { color: #1C3A56; font-size: 16px; border-bottom: 2px solid #DFE3EB; padding-bottom: 8px; margin-top: 32px; }
  .score { background: #F5F8FA; border: 1px solid #DFE3EB; border-radius: 8px; padding: 16px 20px; margin: 16px 0; font-size: 15px; }
  .text-block { background: #F5F8FA; border-left: 4px solid #DFE3EB; padding: 16px; border-radius: 0 8px 8px 0; white-space: pre-wrap; font-size: 14px; line-height: 1.7; }
  .text-block.optimized { border-left-color: #00BDA5; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th { background: #1C3A56; color: white; padding: 10px 12px; text-align: left; }
  .footer { text-align: center; color: #516F90; font-size: 12px; margin-top: 48px; border-top: 1px solid #DFE3EB; padding-top: 16px; }
</style>
</head>
<body>
<div class="header">
  <div class="badge">HUBSPOT ACADEMY</div>
  <h1>Optimizador de contenido para AEO — Resultado del ejercicio</h1>
</div>

<h2>Resultado del diagnóstico</h2>
<div class="score">Cumples <strong>${passedCount} de 4</strong> criterios de optimización para AEO.</div>
<table>
  <tr>
    <th>Pilar</th><th>Criterio</th><th>Resultado</th>
  </tr>
  ${diagnosisRows}
</table>

<h2>Párrafo original</h2>
<div class="text-block"><strong>${headingText}</strong>\n${originalText}</div>

<h2>Párrafo optimizado</h2>
<div class="text-block optimized">${rewrittenText || "(No se completó la reescritura)"}</div>

<div class="footer">HubSpot Academy · Certificación en optimización para motores de respuesta (AEO)</div>
</body>
</html>`;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [originalText, setOriginalText] = useState("");
  const [headingText, setHeadingText] = useState("");
  const [diagnosis, setDiagnosis] = useState({ entity: null, triple: null, heading: null, autonomous: null });
  const [rewrittenText, setRewrittenText] = useState("");

  const diagnosisComplete = DIAGNOSIS_ITEMS.every(i => diagnosis[i.id] !== null);
  const failedItems = DIAGNOSIS_ITEMS.filter(i => diagnosis[i.id] === false);
  const passedCount = DIAGNOSIS_ITEMS.filter(i => diagnosis[i.id] === true).length;

  const scoreColor =
    passedCount === 4 ? COLORS.teal :
    passedCount >= 2 ? COLORS.yellow :
    COLORS.red;

  const scoreLabel =
    passedCount === 4 ? "¡Listo para AEO!" :
    passedCount >= 2 ? "Casi listo — ajusta los puntos pendientes" :
    "Necesita optimización";

  function handleDownload() {
    const html = generateHTML(headingText, originalText, diagnosis, rewrittenText);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aeo-resultado.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  function setDiag(id, value) {
    setDiagnosis(prev => ({ ...prev, [id]: value }));
  }

  const canNext =
    step === 0 ? originalText.trim().length > 80 && headingText.trim().length > 5 :
    step === 1 ? diagnosisComplete :
    step === 2 ? rewrittenText.trim().length > 40 :
    true;

  return (
    <div style={{ fontFamily: "sans-serif", color: COLORS.text, minHeight: "100vh", background: COLORS.light }}>
      {/* Header */}
      <div style={{ background: COLORS.navy, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 56 }}>
          <span style={{ background: COLORS.orange, color: "white", fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 8px", borderRadius: 4 }}>
            HUBSPOT ACADEMY
          </span>
          <span style={{ color: "white", fontWeight: 600, fontSize: 14 }}>
            Optimizador de contenido para AEO
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#e5e9ef", height: 4 }}>
        <div style={{ background: COLORS.teal, height: 4, width: `${((step + 1) / STEPS.length) * 100}%`, transition: "width 0.4s" }} />
      </div>

      {/* Step labels */}
      <div style={{ background: "white", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex" }}>
          {STEPS.map((label, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: "10px 4px", fontSize: 12, fontWeight: 600,
              color: i === step ? COLORS.teal : i < step ? COLORS.slate : "#aab4bf",
              borderBottom: i === step ? `2px solid ${COLORS.teal}` : "2px solid transparent",
            }}>
              {i < step ? "✓ " : ""}{label}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>

        {/* STEP 0 — Pega tu párrafo */}
        {step === 0 && (
          <div>
            <h2 style={{ color: COLORS.navy, marginTop: 0 }}>Pega tu párrafo</h2>
            <p style={{ color: COLORS.slate, lineHeight: 1.7 }}>
              Elige un fragmento de una página real de tu sitio web — puede ser el párrafo de introducción, una descripción de producto o cualquier sección clave. Pégalo aquí tal como está, sin modificarlo todavía.
            </p>
            <div style={{ background: "#FFF8E1", border: `1px solid ${COLORS.yellow}`, borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13 }}>
              💡 <strong>Consejo:</strong> Elige una página que ya tenga tráfico orgánico. Ese contenido ya es relevante para los buscadores — optimizarlo para AEO genera más impacto con menos esfuerzo.
            </div>

            <label style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy, display: "block", marginBottom: 6 }}>
              Encabezado de la sección <span style={{ color: COLORS.red }}>*</span>
            </label>
            <p style={{ fontSize: 13, color: COLORS.slate, marginTop: 0, marginBottom: 8 }}>
              Escribe el encabezado (H2 o H3) de la sección donde aparece tu párrafo.
            </p>
            <input
              type="text"
              value={headingText}
              onChange={e => setHeadingText(e.target.value)}
              placeholder="Ej: Beneficios de nuestra plataforma"
              style={{
                width: "100%", padding: "12px 14px", fontSize: 14,
                border: `1px solid ${COLORS.border}`, borderRadius: 8,
                fontFamily: "sans-serif", color: COLORS.text, boxSizing: "border-box",
                outline: "none", marginBottom: 20,
              }}
            />

            <label style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy, display: "block", marginBottom: 6 }}>
              Párrafo de la sección <span style={{ color: COLORS.red }}>*</span>
            </label>
            <p style={{ fontSize: 13, color: COLORS.slate, marginTop: 0, marginBottom: 8 }}>
              Pega el párrafo que aparece bajo ese encabezado, tal como está, sin modificarlo todavía.
            </p>
            <textarea
              value={originalText}
              onChange={e => setOriginalText(e.target.value)}
              placeholder="Pega aquí tu párrafo original..."
              style={{
                width: "100%", minHeight: 180, padding: 16, fontSize: 14, lineHeight: 1.7,
                border: `1px solid ${COLORS.border}`, borderRadius: 8, resize: "vertical",
                fontFamily: "sans-serif", color: COLORS.text, boxSizing: "border-box",
                outline: "none",
              }}
            />
            <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 6 }}>
              {originalText.trim().length < 80
                ? `Mínimo 80 caracteres (llevas ${originalText.trim().length})`
                : `✓ ${originalText.trim().length} caracteres`}
            </div>
          </div>
        )}

        {/* STEP 1 — Diagnóstico */}
        {step === 1 && (
          <div>
            <h2 style={{ color: COLORS.navy, marginTop: 0 }}>Diagnóstico guiado</h2>
            <p style={{ color: COLORS.slate, lineHeight: 1.7 }}>
              Lee tu párrafo y responde las tres preguntas. Sé honesto — el diagnóstico solo es útil si refleja el estado real del contenido.
            </p>

            {/* Original text preview */}
            <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 16, marginBottom: 24, fontSize: 13, lineHeight: 1.7, color: COLORS.slate }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.orange, marginBottom: 8, letterSpacing: 0.5 }}>TU CONTENIDO</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy, marginBottom: 8 }}>{headingText}</div>
              {originalText}
            </div>

            {DIAGNOSIS_ITEMS.map((item, idx) => (
              <div key={item.id} style={{
                background: "white", border: `1px solid ${diagnosis[item.id] === true ? COLORS.teal : diagnosis[item.id] === false ? COLORS.red : COLORS.border}`,
                borderRadius: 8, padding: 20, marginBottom: 16, transition: "border-color 0.2s"
              }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  <span style={{ background: COLORS.navy, color: "white", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>{item.pilar}</span>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{item.label}</span>
                </div>
                <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6 }}>{item.question}</p>
                <div style={{ background: COLORS.light, borderRadius: 6, padding: "10px 14px", fontSize: 12, color: COLORS.slate, marginBottom: 16 }}>
                  💡 {item.hint}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {[true, false].map(val => (
                    <button key={String(val)} onClick={() => setDiag(item.id, val)} style={{
                      padding: "8px 24px", borderRadius: 6, border: `2px solid ${diagnosis[item.id] === val ? (val ? COLORS.teal : COLORS.red) : COLORS.border}`,
                      background: diagnosis[item.id] === val ? (val ? COLORS.teal : COLORS.red) : "white",
                      color: diagnosis[item.id] === val ? "white" : COLORS.text,
                      fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.15s"
                    }}>
                      {val ? "Sí" : "No"}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {diagnosisComplete && (
              <div style={{ background: "white", border: `2px solid ${scoreColor}`, borderRadius: 8, padding: 16, marginTop: 8, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: scoreColor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, flexShrink: 0 }}>
                  {passedCount}/4
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: scoreColor }}>{scoreLabel}</div>
                  <div style={{ fontSize: 13, color: COLORS.slate, marginTop: 2 }}>
                    {passedCount === 4
                      ? "Tu párrafo ya cumple los cuatro criterios. La reescritura lo dejará aún más sólido."
                      : `Tienes ${4 - passedCount} aspecto${4 - passedCount > 1 ? "s" : ""} por mejorar. El siguiente paso te guía cómo hacerlo.`}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2 — Reescritura */}
        {step === 2 && (
          <div>
            <h2 style={{ color: COLORS.navy, marginTop: 0 }}>Reescribe tu párrafo</h2>
            <p style={{ color: COLORS.slate, lineHeight: 1.7 }}>
              Basándote en tu diagnóstico, reescribe el párrafo aplicando las correcciones necesarias. Usa las guías específicas para cada criterio que no cumpliste.
            </p>

            {/* Guidance for failed items */}
            {failedItems.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.navy, marginBottom: 12 }}>Qué debes corregir:</div>
                {failedItems.map(item => (
                  <div key={item.id} style={{ background: "#FFF3F3", border: `1px solid #f7c5c7`, borderRadius: 8, padding: 16, marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: COLORS.red, fontSize: 13, marginBottom: 8 }}>❌ {item.label}</div>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {item.guidanceIfNo.map((g, i) => (
                        <li key={i} style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.text, marginBottom: 4 }}>{g}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {passedCount === 4 && (
              <div style={{ background: "#E8FAF8", border: `1px solid ${COLORS.teal}`, borderRadius: 8, padding: 14, marginBottom: 20, fontSize: 13 }}>
                ✅ Tu párrafo ya cumple los cuatro criterios. Aun así, reescríbelo para consolidar las técnicas y ver la diferencia en el resultado final.
              </div>
            )}

            {/* Reference */}
            <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 20, fontSize: 13, lineHeight: 1.7, color: COLORS.slate }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.orange, marginBottom: 8, letterSpacing: 0.5 }}>CONTENIDO ORIGINAL (referencia)</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy, marginBottom: 6 }}>{headingText}</div>
              {originalText}
            </div>

            <textarea
              value={rewrittenText}
              onChange={e => setRewrittenText(e.target.value)}
              placeholder="Escribe aquí tu versión optimizada..."
              style={{
                width: "100%", minHeight: 180, padding: 16, fontSize: 14, lineHeight: 1.7,
                border: `1px solid ${COLORS.teal}`, borderRadius: 8, resize: "vertical",
                fontFamily: "sans-serif", color: COLORS.text, boxSizing: "border-box",
                outline: "none",
              }}
            />
            <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 6 }}>
              {rewrittenText.trim().length < 40 ? "Escribe tu versión optimizada para continuar" : `✓ ${rewrittenText.trim().length} caracteres`}
            </div>
          </div>
        )}

        {/* STEP 3 — Antes / Después */}
        {step === 3 && (
          <div>
            <h2 style={{ color: COLORS.navy, marginTop: 0 }}>Antes / Después</h2>
            <p style={{ color: COLORS.slate, lineHeight: 1.7 }}>
              Compara tu versión original con la optimizada. Esta es la diferencia que los motores de respuesta van a notar.
            </p>

            {/* Score summary */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              {DIAGNOSIS_ITEMS.map(item => (
                <div key={item.id} style={{
                  flex: 1, background: "white", border: `2px solid ${diagnosis[item.id] === true ? COLORS.teal : COLORS.red}`,
                  borderRadius: 8, padding: "10px 12px", textAlign: "center"
                }}>
                  <div style={{ fontSize: 18 }}>{diagnosis[item.id] === true ? "✅" : "✏️"}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.navy, marginTop: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: diagnosis[item.id] === true ? COLORS.teal : COLORS.orange, fontWeight: 600, marginTop: 2 }}>
                    {diagnosis[item.id] === true ? "Ya cumplía" : "Corregido"}
                  </div>
                </div>
              ))}
            </div>

            {/* Side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate, letterSpacing: 0.5, marginBottom: 8 }}>ORIGINAL</div>
                <div style={{
                  background: "white", border: `1px solid ${COLORS.border}`, borderLeft: `4px solid #ccc`,
                  borderRadius: "0 8px 8px 0", padding: 16, fontSize: 13, lineHeight: 1.8, color: COLORS.slate, minHeight: 160
                }}>
                  <div style={{ fontWeight: 700, color: COLORS.slate, marginBottom: 8 }}>{headingText}</div>
                  {originalText}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.teal, letterSpacing: 0.5, marginBottom: 8 }}>OPTIMIZADO PARA AEO</div>
                <div style={{
                  background: "#E8FAF8", border: `1px solid ${COLORS.teal}`, borderLeft: `4px solid ${COLORS.teal}`,
                  borderRadius: "0 8px 8px 0", padding: 16, fontSize: 13, lineHeight: 1.8, color: COLORS.text, minHeight: 160
                }}>
                  {rewrittenText}
                </div>
              </div>
            </div>

            <div style={{ background: COLORS.navy, borderRadius: 10, padding: 24, textAlign: "center" }}>
              <div style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
                ¡Ejercicio completado!
              </div>
              <div style={{ color: "#a8bccf", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                Descarga tu resultado para guardar el antes/después y tu diagnóstico completo.
              </div>
              <button onClick={handleDownload} style={{
                background: COLORS.orange, color: "white", border: "none", borderRadius: 6,
                padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer"
              }}>
                Descargar resultado ↓
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            style={{
              padding: "10px 24px", borderRadius: 6, border: `1px solid ${COLORS.border}`,
              background: "white", color: step === 0 ? "#ccc" : COLORS.text,
              fontWeight: 600, fontSize: 14, cursor: step === 0 ? "default" : "pointer"
            }}
          >
            ← Anterior
          </button>

          {step < STEPS.length - 1 && (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext}
              style={{
                padding: "10px 28px", borderRadius: 6, border: "none",
                background: canNext ? COLORS.teal : "#ccc",
                color: "white", fontWeight: 700, fontSize: 14,
                cursor: canNext ? "pointer" : "default", transition: "background 0.2s"
              }}
            >
              Siguiente →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
