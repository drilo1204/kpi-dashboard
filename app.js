// ============================================================
// KPI DASHBOARD – RENDERING
// ============================================================

function getAmpel(wert, schwellen, invertiert = false) {
  if (invertiert) {
    if (wert <= schwellen.gruen) return "gruen";
    if (wert <= schwellen.gelb) return "gelb";
    return "rot";
  }
  if (wert >= schwellen.gruen) return "gruen";
  if (wert >= schwellen.gelb) return "gelb";
  return "rot";
}

function ampelLabel(klasse) {
  const labels = { gruen: "Im Ziel", gelb: "Achtung", rot: "Kritisch" };
  return labels[klasse] || "";
}

function formatWert(wert, einheit) {
  if (einheit === "%") return `${wert}`;
  if (einheit === "/h") {
    return wert < 1 ? wert.toFixed(2) : wert.toFixed(1);
  }
  if (typeof wert === "number" && wert % 1 !== 0) return wert.toFixed(1);
  return `${wert}`;
}

function einheitSuffix(einheit) {
  if (einheit === "%") return "%";
  return einheit;
}

// Bei Prozent-KPIs: "pp" (Prozentpunkte) statt "%", sonst reine Zahl
function diffSuffix(einheit) {
  return einheit === "%" ? " pp" : "";
}

// ---- Ziel-Chip (prominent neben aktuell) ----
function zielChipHTML(kpi) {
  const zielFmt = formatWert(kpi.ziel, kpi.einheit);
  const suf = einheitSuffix(kpi.einheit);
  return `<span class="kpi-ziel-chip"><span class="kpi-ziel-label">Ziel</span><strong>${zielFmt}${suf}</strong></span>`;
}

// ---- Trend-Chip (Vergleich 1. vs 2. Hälfte der letzten N Perioden) ----
// Nach Cole Nussbaumer Knaflic: "ein Signal pro Element" – Richtung + Prozent.
function computeTrendChip(kpi, trend) {
  if (!trend || trend.length < 4) return "";
  const werte = trend.map(t => t.wert);
  const n = werte.length;
  const half = Math.floor(n / 2);
  const first = werte.slice(0, half);
  const second = werte.slice(-half);
  const avgFirst = first.reduce((a, b) => a + b, 0) / first.length;
  const avgSecond = second.reduce((a, b) => a + b, 0) / second.length;
  const diff = avgSecond - avgFirst;
  const percent = avgFirst === 0 ? 0 : (diff / avgFirst) * 100;
  const absPercent = Math.round(Math.abs(percent));
  const invert = !!kpi.invertiert;

  let cls, arrow;
  if (absPercent < 3) {
    cls = "neutral";
    arrow = "&#9654;";
  } else if (diff > 0) {
    cls = invert ? "down" : "up";
    arrow = "&#9650;";
  } else {
    cls = invert ? "up" : "down";
    arrow = "&#9660;";
  }

  let label;
  if (kpi.intervall === "wöchentlich") label = `${n}W-Trend`;
  else if (kpi.intervall === "monatlich") label = `${n}M-Trend`;
  else if (kpi.intervall === "quartalsweise") label = `${n}Q-Trend`;
  else label = `${n}-Trend`;

  const sign = diff > 0 ? "+" : "−";
  const tooltip = `Vergleich: Ø letzte ${second.length} vs. Ø erste ${first.length} Perioden`;
  return `<span class="trend-chip ${cls}" title="${tooltip}"><span class="delta-arrow">${arrow}</span> ${label}: ${sign}${absPercent} %</span>`;
}

// ---- Delta-Zeile: ein Vergleichs-Chip zum Vormonat/Vorwoche ----
function deltaZeile(trend, kpi) {
  if (!trend || trend.length < 2) return "";
  const aktuell = trend[trend.length - 1];
  const vormonat = trend[trend.length - 2];
  const suf = diffSuffix(kpi.einheit);
  const invert = !!kpi.invertiert;

  const diff = aktuell.wert - vormonat.wert;
  const absDiff = Math.round(Math.abs(diff) * 10) / 10;
  const isGood = invert ? diff < 0 : diff > 0;
  const isBad  = invert ? diff > 0 : diff < 0;
  let chip;
  if (diff === 0) {
    chip = `<span class="delta-item neutral"><span class="delta-arrow">&#9654;</span> vs. ${vormonat.periode}: 0</span>`;
  } else {
    const arrow = diff > 0 ? "&#9650;" : "&#9660;";
    const sign  = diff > 0 ? "+" : "−";
    const cls   = isGood ? "up" : (isBad ? "down" : "neutral");
    chip = `<span class="delta-item ${cls}"><span class="delta-arrow">${arrow}</span> vs. ${vormonat.periode}: ${sign}${absDiff}${suf}</span>`;
  }
  return `<div class="delta-zeile">${chip}</div>`;
}

// ---- Fortschrittsbalken zum Ziel ----
function progressBar(aktuell, ziel, ampel, invertiert = false) {
  let prozent;
  if (invertiert) {
    prozent = aktuell <= ziel ? 100 : Math.max(0, (ziel / aktuell) * 100);
  } else {
    prozent = ziel > 0 ? Math.min(120, (aktuell / ziel) * 100) : 0;
  }
  const width = Math.min(100, prozent);
  return `
    <div class="progress-wrapper">
      <div class="progress-track">
        <div class="progress-fill ampel-${ampel}" style="width:${width}%"></div>
        <div class="progress-goal-marker"></div>
      </div>
      <span class="progress-label">${Math.round(prozent)} % vom Ziel</span>
    </div>`;
}

// ---- Kopfleiste: Kategorie + Verantwortlicher ----
function kopfleiste(kpi) {
  const kat = KATEGORIEN[kpi.kategorie];
  const katChip = kat
    ? `<span class="kategorie-chip" style="--kat-color:${kat.farbe}">${kat.label}</span>`
    : "";
  const respChip = kpi.verantwortlich
    ? `<span class="verantwortlich-chip">${kpi.verantwortlich}</span>`
    : "";
  return `<div class="kpi-meta">${katChip}${respChip}<span class="kpi-intervall">${kpi.intervall}</span></div>`;
}

// ---- Handlungs-Empfehlung (nur bei rot/gelb) ----
function handlungHTML(kpi, ampel) {
  if (!kpi.handlung || ampel === "gruen") return "";
  const text = kpi.handlung[ampel];
  if (!text) return "";
  const icon = ampel === "rot" ? "&#9888;" : "&#9432;";
  return `<div class="handlung ampel-${ampel}"><span class="handlung-icon">${icon}</span>${text}</div>`;
}

// ---- Story-Text ----
function storyHTML(kpi) {
  if (!kpi.storyText) return "";
  return `<div class="story-text">${kpi.storyText}</div>`;
}

// ---- Sparkline SVG mit Ziellinie (Bullet-Chart-Prinzip nach Stephen Few) + Hover-Tooltips ----
function sparklineSVG(daten, farbe, breite, hoehe, einheit, ziel) {
  if (!daten || daten.length < 2) return "";
  const werte = daten.map(d => d.wert);
  const min = Math.min(...werte);
  const max = Math.max(...werte);
  // Ziel ins Wertespektrum einbeziehen, damit die Ziellinie immer sichtbar ist
  const effMin = ziel != null ? Math.min(min, ziel) : min;
  const effMax = ziel != null ? Math.max(max, ziel) : max;
  const range = (effMax - effMin) || 1;
  const pad = 4;

  const punkte = werte.map((w, i) => {
    const x = pad + (i / (werte.length - 1)) * (breite - 2 * pad);
    const y = hoehe - pad - ((w - effMin) / range) * (hoehe - 2 * pad);
    return { x, y, wert: w, periode: daten[i].periode };
  });

  const strokeColor = farbe === "gruen" ? "var(--green)"
    : farbe === "gelb" ? "var(--yellow)"
    : farbe === "rot" ? "var(--red)" : "var(--sparkline)";

  const suf = einheit || "";
  const polyline = punkte.map(p => `${p.x},${p.y}`).join(" ");
  const last = punkte[punkte.length - 1];

  let zielLinie = "";
  if (ziel != null) {
    const zielY = hoehe - pad - ((ziel - effMin) / range) * (hoehe - 2 * pad);
    zielLinie = `<line x1="${pad}" y1="${zielY}" x2="${breite - pad}" y2="${zielY}" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3,3" opacity="0.55"><title>Ziel: ${ziel}${suf}</title></line>`;
  }

  const hoverPunkte = punkte.map(p =>
    `<circle cx="${p.x}" cy="${p.y}" r="6" fill="rgba(255,255,255,0.001)" class="spark-hit">
       <title>${p.periode}: ${p.wert}${suf}</title>
     </circle>`
  ).join("");

  return `<svg viewBox="0 0 ${breite} ${hoehe}" preserveAspectRatio="none">
    ${zielLinie}
    <polyline points="${polyline}" fill="none" stroke="${strokeColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${last.x}" cy="${last.y}" r="3.5" fill="${strokeColor}"/>
    ${hoverPunkte}
  </svg>`;
}

// ---- Wochen-Chips + Trend-Chip in einer Zeile ----
function letzteWochenHTML(kpi, trend) {
  if (!kpi.showLetzteWochen || trend.length < kpi.showLetzteWochen) {
    // Auch ohne Wochen-Chips: Trend-Chip zeigen wenn genug Daten
    const trendOnly = computeTrendChip(kpi, trend || []);
    return trendOnly ? `<div class="kpi-details letzte-wochen">${trendOnly}</div>` : "";
  }
  const letzte = trend.slice(-kpi.showLetzteWochen);
  const suf = diffSuffix(kpi.einheit);
  const wochenChips = letzte.map((item, i) => {
    const wAmpel = getAmpel(item.wert, kpi.schwpiegel, kpi.invertiert);
    const prev = i > 0 ? letzte[i-1].wert : null;
    let arrow = "";
    if (prev !== null) {
      const diff = item.wert - prev;
      const isGood = kpi.invertiert ? diff < 0 : diff > 0;
      const isBad = kpi.invertiert ? diff > 0 : diff < 0;
      const absDiff = Math.round(Math.abs(diff) * 10) / 10;
      if (diff > 0) arrow = `<span class="trend-arrow ${isGood ? 'up' : 'down'}">&#9650; +${absDiff}${suf}</span>`;
      else if (diff < 0) arrow = `<span class="trend-arrow ${isBad ? 'down' : 'up'}">&#9660; ${absDiff}${suf}</span>`;
      else arrow = `<span class="trend-arrow neutral">&#9654; 0</span>`;
    }
    return `<span class="detail-chip woche-chip ${wAmpel}"><strong>${item.wert}</strong> ${item.periode}${arrow}</span>`;
  }).join("");
  const trendChip = computeTrendChip(kpi, trend);
  return `<div class="kpi-details letzte-wochen">${wochenChips}${trendChip}</div>`;
}

// ---- Mitarbeiter-Zeilen ----
function renderMitarbeiterHTML(kpi) {
  if (!kpi.mitarbeiter) return "";
  const suf = einheitSuffix(kpi.einheit);
  const ohneAmpel = !!kpi.mitarbeiterOhneAmpel;
  let html = "";
  for (const [key, ma] of Object.entries(kpi.mitarbeiter)) {
    const maInfo = MITARBEITER[key];
    if (!maInfo) continue;
    const maAmpel = ohneAmpel ? "gruen" : getAmpel(ma.aktuell, kpi.schwpiegel);
    const infoSpan = ma.info ? `<span class="ma-info">${ma.info}</span>` : "";

    let quartalHTML = "";
    if (ma.quartale && ma.quartale.length > 0) {
      const q = ma.quartale;
      const chips = [];
      const chipCls = (w) => ohneAmpel ? "neutral" : `ampel-${getAmpel(w, kpi.schwpiegel, kpi.invertiert)}`;
      if (q.length === 1) {
        const only = q[0];
        chips.push(`<span class="ma-monat ${chipCls(only.wert)}"><span class="mm-per">${only.periode}</span> ${only.wert}${suf}<span class="q-neu">NEU</span></span>`);
      } else {
        for (let i = 0; i < q.length - 1; i++) {
          const item = q[i];
          chips.push(`<span class="ma-monat ${chipCls(item.wert)}"><span class="mm-per">${item.periode}</span> ${item.wert}${suf}</span>`);
        }
        const last = q[q.length - 1];
        const prev = q[q.length - 2];
        const diff = last.wert - prev.wert;
        const isGood = kpi.invertiert ? diff < 0 : diff > 0;
        const isBad = kpi.invertiert ? diff > 0 : diff < 0;
        const absDiff = Math.round(Math.abs(diff) * 10) / 10;
        let deltaHTML = "";
        if (diff > 0)      deltaHTML = `<span class="q-delta ${isGood ? 'up' : 'down'}">&#9650;${absDiff}</span>`;
        else if (diff < 0) deltaHTML = `<span class="q-delta ${isBad ? 'down' : 'up'}">&#9660;${absDiff}</span>`;
        else               deltaHTML = `<span class="q-delta neutral">&#9654;0</span>`;
        chips.push(`<span class="ma-monat ${chipCls(last.wert)}"><span class="mm-per">${last.periode}</span> ${last.wert}${suf}${deltaHTML}</span>`);
      }
      quartalHTML = `<div class="ma-monate">${chips.join("")}</div>`;
    }

    const sparkline = !quartalHTML && ma.trend && ma.trend.length >= 2
      ? `<div class="ma-sparkline">${sparklineSVG(ma.trend, maAmpel, 80, 24, suf)}</div>` : "";

    const valueCls = ohneAmpel ? "neutral" : `ampel-${maAmpel}`;
    html += `
      <div class="ma-row">
        <span class="ma-name">${maInfo.name}${infoSpan}</span>
        ${quartalHTML}${sparkline}
        <span class="ma-value ${valueCls}">${formatWert(ma.aktuell, kpi.einheit)}${suf}</span>
      </div>`;
  }
  return html ? `<div class="ma-section">${html}</div>` : "";
}

// ---- Standard KPI Karte ----
function renderStandardCard(kpi) {
  const ampel = getAmpel(kpi.aktuell, kpi.schwpiegel, kpi.invertiert);
  const prio = kpi.prioritaet || "sek";

  let detailsHTML = "";
  if (kpi.details) {
    const d = kpi.details;
    detailsHTML = `
      <div class="kpi-details">
        <span class="detail-chip promotoren"><strong>${d.promotoren}</strong> Promotoren</span>
        <span class="detail-chip passive"><strong>${d.passive}</strong> Passive</span>
        <span class="detail-chip kritiker"><strong>${d.kritiker}</strong> Kritiker</span>
        <span class="detail-chip"><strong>${d.rueckmeldungen}</strong> Gesamt</span>
      </div>`;
  }

  const trend = kpi.trend || [];
  const wochenChips = letzteWochenHTML(kpi, trend);
  const sparkBreite = 200;
  const sparkHoehe = 50;

  return `
    <div class="kpi-card ${prio} ampel-${ampel}" data-kat="${kpi.kategorie}">
      ${kopfleiste(kpi)}
      <div class="kpi-title">${kpi.label}</div>
      <div class="kpi-value-row">
        <div class="kpi-value-group">
          <span class="kpi-value ampel-${ampel}">${formatWert(kpi.aktuell, kpi.einheit)}<span class="kpi-einheit">${einheitSuffix(kpi.einheit)}</span></span>
          ${zielChipHTML(kpi)}
        </div>
        <span class="ampel-badge ${ampel}"><span class="ampel-dot"></span>${ampelLabel(ampel)}</span>
      </div>
      ${deltaZeile(trend, kpi)}
      ${progressBar(kpi.aktuell, kpi.ziel, ampel, kpi.invertiert)}
      ${detailsHTML}
      ${wochenChips}
      ${trend.length >= 2 ? `
        <div class="sparkline-container">${sparklineSVG(trend, ampel, sparkBreite, sparkHoehe, einheitSuffix(kpi.einheit), kpi.ziel)}</div>
        <div class="sparkline-labels">
          <span>${trend[0].periode}</span>
          <span>${trend[trend.length-1].periode}</span>
        </div>` : ""}
      ${storyHTML(kpi)}
      ${handlungHTML(kpi, ampel)}
      ${renderMitarbeiterHTML(kpi)}
    </div>`;
}

// ---- Mitarbeiter KPI Karte ----
function renderMaCard(kpi) {
  const teamAmpel = getAmpel(kpi.teamAktuell, kpi.schwpiegel);
  const teamTrend = kpi.teamTrend || [];
  const prio = kpi.prioritaet || "sek";

  const maHTML = renderMitarbeiterHTML(kpi);
  const wochenChips = letzteWochenHTML(kpi, teamTrend);
  const sparkBreite = 200;
  const sparkHoehe = 40;

  return `
    <div class="kpi-card ${prio} ampel-${teamAmpel}" data-kat="${kpi.kategorie}">
      ${kopfleiste(kpi)}
      <div class="kpi-title">${kpi.label}</div>
      <div class="kpi-value-row">
        <div class="kpi-value-group">
          <span class="kpi-value ampel-${teamAmpel}">${formatWert(kpi.teamAktuell, kpi.einheit)}<span class="kpi-einheit">${einheitSuffix(kpi.einheit)}</span></span>
          ${zielChipHTML(kpi)}
        </div>
        <span class="ampel-badge ${teamAmpel}"><span class="ampel-dot"></span>${ampelLabel(teamAmpel)}</span>
      </div>
      ${deltaZeile(teamTrend, kpi)}
      ${progressBar(kpi.teamAktuell, kpi.ziel, teamAmpel, kpi.invertiert)}
      ${wochenChips}
      ${teamTrend.length >= 2 ? `
        <div class="sparkline-container">${sparklineSVG(teamTrend, teamAmpel, sparkBreite, sparkHoehe, einheitSuffix(kpi.einheit), kpi.ziel)}</div>
        <div class="sparkline-labels">
          <span>${teamTrend[0].periode}</span>
          <span>${teamTrend[teamTrend.length-1].periode}</span>
        </div>` : ""}
      ${storyHTML(kpi)}
      ${handlungHTML(kpi, teamAmpel)}
      ${maHTML}
    </div>`;
}

// ---- Dashboard Rendern ----
function renderDashboard() {
  document.getElementById("dashboard-title").textContent = DASHBOARD_CONFIG.titel;
  document.getElementById("meta-kw").textContent = DASHBOARD_CONFIG.aktuelleKW;
  document.getElementById("meta-monat").textContent = DASHBOARD_CONFIG.aktuellerMonat;
  document.getElementById("meta-update").textContent = DASHBOARD_CONFIG.letzteAktualisierung;

  const grid = document.getElementById("dashboard-grid");
  grid.innerHTML = "";

  // 3+3 gleich große Karten: Vertrieb + NPS oben, Kunde + Fulfillment unten
  grid.innerHTML += renderMaCard(KPI_CONVERSION);
  grid.innerHTML += renderStandardCard(KPI_VERTRAGSEINGAENGE_WOCHE);
  grid.innerHTML += renderStandardCard(KPI_NPS);
  grid.innerHTML += renderStandardCard(KPI_GOOGLE);
  grid.innerHTML += renderStandardCard(KPI_REFERENZ);
  grid.innerHTML += renderStandardCard(KPI_GRAFIK);
}

document.addEventListener("DOMContentLoaded", renderDashboard);
