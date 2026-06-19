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

function generateHTML(originalText, diagnosis, rewrittenText) {
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
<div
