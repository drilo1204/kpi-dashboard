// ============================================================
// KPI DASHBOARD – DATEN & KONFIGURATION
// ============================================================
// Diese Datei ist die EINZIGE Datei, die du bearbeiten musst.
// Aktualisiere die Zahlen und speichere – fertig.
// ============================================================

const DASHBOARD_CONFIG = {
  titel: "Partner & Friends – KPI Dashboard",
  letzteAktualisierung: "30.07.2026",
  aktuelleKW: "KW 30",
  aktuellerMonat: "Juli 2026",
};

// ------------------------------------------------------------
// MITARBEITER (für Telefonate/h und Verträge/h)
// ------------------------------------------------------------
const MITARBEITER = {
  fatima: { name: "Fatima", kuerzel: "FE" },
  nicole: { name: "Nicole", kuerzel: "NS" },
  gabriella: { name: "Gabriella", kuerzel: "GR" },
  david: { name: "David", kuerzel: "DE" },
};

// ------------------------------------------------------------
// KATEGORIE-FARBEN (visuelle Gruppierung)
// ------------------------------------------------------------
const KATEGORIEN = {
  vertrieb:    { label: "Vertrieb",           farbe: "#6366f1" },  // Indigo
  kunde:       { label: "Kundenzufriedenheit", farbe: "#0ea5e9" },  // Sky
  fulfillment: { label: "Fulfillment",        farbe: "#a855f7" },  // Purple
};

// ============================================================
// KPI 1: Google-Bewertungsquote
// Intervall: monatlich
// Quelle: 02_Excel_Quelldaten/Google-Bewertungen_Referenzen_Auslieferungen.xlsx
// ============================================================
const KPI_GOOGLE = {
  label: "Google-Bewertungsquote",
  kurzlabel: "Google-Quote",
  einheit: "%",
  intervall: "monatlich",
  kategorie: "kunde",
  prioritaet: "sek",
  verantwortlich: "Institutionsbetreuung",
  schwpiegel: { gruen: 65, gelb: 50 },
  aktuell: 58.1,  // 43 von 74 Auslieferungen Jan-Jun (Stadt Göttingen ausgeklammert; Juli läuft noch)
  ziel: 65,
  showLetzteWochen: 3,
  trend: [
    { periode: "Jan 26", wert: 33.3 },
    { periode: "Feb 26", wert: 78.6 },
    { periode: "Mrz 26", wert: 80 },   // ohne Stadt Göttingen: 16/20
    { periode: "Apr 26", wert: 47.1 },
    { periode: "Mai 26", wert: 42.9 },
    { periode: "Jun 26", wert: 30.8 },
    // Jul 26 laeuft noch – erst nach Monatsabschluss aufnehmen (RULES 0.2 + 3.1)
  ],
  storyText: "Bewertungen weiter aktiv einholen — Ziel 65 % rückt näher",
  handlung: {
    rot: "Bewertung aktiv anfragen: 3 Tage nach Auslieferung + Erinnerung Tag 10",
    gelb: "Ansprache pro Institutionstyp differenzieren",
  },
};

// ============================================================
// KPI 2: Referenzquote
// Intervall: monatlich
// Quelle: 02_Excel_Quelldaten/Google-Bewertungen_Referenzen_Auslieferungen.xlsx
// ============================================================
const KPI_REFERENZ = {
  label: "Referenzquote",
  kurzlabel: "Referenz-Quote",
  einheit: "%",
  intervall: "monatlich",
  kategorie: "kunde",
  prioritaet: "sek",
  verantwortlich: "Institutionsbetreuung",
  schwpiegel: { gruen: 90, gelb: 65 },
  aktuell: 86.5,  // 64 von 74 Auslieferungen Jan-Jun (Stadt Göttingen ausgeklammert; Juli läuft noch)
  ziel: 90,
  showLetzteWochen: 3,
  trend: [
    { periode: "Jan 26", wert: 33.3 },
    { periode: "Feb 26", wert: 92.9 },
    { periode: "Mrz 26", wert: 80 },   // ohne Stadt Göttingen: 16/20
    { periode: "Apr 26", wert: 94.1 },
    { periode: "Mai 26", wert: 100 },
    { periode: "Jun 26", wert: 84.6 },
    // Jul 26 laeuft noch – erst nach Monatsabschluss aufnehmen (RULES 0.2 + 3.2)
  ],
  storyText: "Konstant hohe Referenzquote — 90 %-Ziel in Reichweite",
  handlung: null,
};

// ============================================================
// KPI 3: NPS Institutionsbetreuung
// Intervall: quartalsweise (Q1 = Jan-Mrz, Q2 = Apr-Jun usw.)
// Quellen:
//   - 02_Excel_Quelldaten/Kopie von Wie läufts mit Eurem Fahrzeug  Anhänger.xlsx
//   - 02_Excel_Quelldaten/Kopie von Wie läufts mit Eurem Torzähler.xlsx
// Q2 26: Erhebung läuft noch – vorläufiger Wert aus Apr+Mai (17 Rückläufe).
// ============================================================
const KPI_NPS = {
  label: "NPS Institutionsbetreuung",
  kurzlabel: "NPS",
  einheit: "",
  intervall: "quartalsweise",
  kategorie: "kunde",
  prioritaet: "sek",
  verantwortlich: "Institutionsbetreuung",
  schwpiegel: { gruen: 60, gelb: 30 },
  aktuell: 70.6,  // Q2 26 vorläufig – Juni-Rückläufe noch einzuholen
  ziel: 60,
  showLetzteWochen: 3,
  trend: [
    { periode: "Q2 25", wert: 71.4 },   // 5 Prom / 2 Pass / 0 Detr (7 Rückläufe)
    { periode: "Q3 25", wert: 75.0 },   // 3 Prom / 1 Pass / 0 Detr (4 Rückläufe)
    { periode: "Q2 26", wert: 70.6 },   // vorläufig – Juni-Erhebung ausstehend
  ],
  details: {
    rueckmeldungen: 17,
    promotoren: 13,
    passive: 3,
    kritiker: 1,
  },
  storyText: "Q2 26 vorläufig 70,6 · Vorjahr Q2 25: 71,4 (−0,8 pp) — Juni-Rückläufe noch einzuholen",
  handlung: {
    rot: "Kritisches Feedback direkt zurückspiegeln, Ursache dokumentieren",
    gelb: "Neutrale Rückmeldungen aktiv nachbereiten",
  },
};

// ============================================================
// KPI 4: Leads Conversion Rate
// Intervall: wöchentlich
// Quelle: 02_Excel_Quelldaten/ConversionRate.xlsx
// Stand 15.07.2026: Reife-Konzept + 5-V-Schwelle deaktiviert (auf Wunsch).
// Alle 3 Hauptverkäufer werden mit Total-Werten seit Jan 2026 gezeigt.
// ============================================================
const KPI_CONVERSION = {
  label: "Leads Conversion Rate",
  kurzlabel: "Conversion Rate",
  einheit: "%",
  intervall: "wöchentlich",
  kategorie: "vertrieb",
  prioritaet: "prio",
  verantwortlich: "Vertriebsleitung",
  schwpiegel: { gruen: 20, gelb: 10 },
  ziel: 20,
  teamAktuell: 15.3,  // 98 Verträge / 643 Leads (Fatima, Gabriella, David; ohne Juli Drilan)
  showLetzteWochen: 2,
  teamTrend: [
    { periode: "Jan 26", wert: 8.9 },
    { periode: "Feb 26", wert: 20.7 },
    { periode: "Mrz 26", wert: 5.6 },
    { periode: "Mai 26", wert: 12.5 },
    { periode: "Jun 26", wert: 37.4 },
  ],
  storyText: "Starkes Juni-Ergebnis: Team-Peak 37 % — Fatima und David legen kräftig zu",
  handlung: {
    rot: "Nachfassen bei laufenden Leads, gute Praxis austauschen",
    gelb: "Juni-Peak-Bedingungen reproduzieren, Top-Skripte teilen",
  },
  mitarbeiter: {
    fatima: {
      aktuell: 12.6,  // 49 / 388
      quartale: [
        { periode: "Jan-Mrz", wert: 10.0 },
        { periode: "Apr-Jun", wert: 15.7 },
      ],
    },
    gabriella: {
      aktuell: 6.7,  // 8 / 120
      quartale: [
        { periode: "Jan-Mrz", wert: 5.6 },
        { periode: "Apr-Jun", wert: 10.0 },
      ],
    },
    david: {
      aktuell: 30.4,  // 41 / 135 (Mai+Jun+Juli)
      quartale: [
        { periode: "Apr-Jun", wert: 28.0 },
      ],
    },
  },
};

// ============================================================
// KPI 5: Vertragseingänge pro Woche
// Intervall: wöchentlich
// Quelle: 02_Excel_Quelldaten/ConversionRate.xlsx → Sheet Vertragseingänge (Rohdaten)
// KW 30 läuft noch → nicht aufnehmen
// ============================================================
const KPI_VERTRAGSEINGAENGE_WOCHE = {
  label: "Vertragseingänge pro Woche",
  kurzlabel: "Verträge/Woche",
  einheit: "",
  intervall: "wöchentlich",
  kategorie: "vertrieb",
  prioritaet: "prio",
  verantwortlich: "Vertriebsleitung",
  schwpiegel: { gruen: 10, gelb: 7 },
  aktuell: 6.8,  // 178 Verträge / 26 KWs mit ≥1 Vertrag (ohne laufende KW 30)
  ziel: 10,
  showLetzteWochen: 3,
  mitarbeiterOhneAmpel: true,
  mitarbeiter: {
    fatima: {
      aktuell: 72,   // Total Verträge 2026 (Rohdaten, ohne laufende KW 30)
      quartale: [
        { periode: "Jan-Mrz", wert: 34 },
        { periode: "Apr-Jun", wert: 31 },
      ],
    },
    gabriella: {
      aktuell: 42,
      quartale: [
        { periode: "Jan-Mrz", wert: 14 },
        { periode: "Apr-Jun", wert: 23 },
      ],
    },
    david: {
      aktuell: 16,
      quartale: [
        { periode: "Apr-Jun", wert: 7 },
      ],
    },
  },
  trend: [
    { periode: "KW 2", wert: 3 },
    { periode: "KW 3", wert: 1 },
    { periode: "KW 4", wert: 5 },
    { periode: "KW 5", wert: 10 },
    { periode: "KW 6", wert: 10 },
    { periode: "KW 7", wert: 10 },
    { periode: "KW 8", wert: 6 },
    { periode: "KW 9", wert: 4 },
    { periode: "KW 10", wert: 8 },
    { periode: "KW 11", wert: 8 },
    { periode: "KW 12", wert: 7 },
    { periode: "KW 13", wert: 2 },
    { periode: "KW 14", wert: 0 },
    { periode: "KW 15", wert: 8 },
    { periode: "KW 16", wert: 5 },
    { periode: "KW 17", wert: 7 },
    { periode: "KW 18", wert: 7 },
    { periode: "KW 19", wert: 8 },
    { periode: "KW 20", wert: 4 },
    { periode: "KW 21", wert: 1 },
    { periode: "KW 22", wert: 5 },
    { periode: "KW 23", wert: 5 },
    { periode: "KW 24", wert: 1 },
    { periode: "KW 25", wert: 0 },
    { periode: "KW 26", wert: 19 },
    { periode: "KW 27", wert: 19 },
    { periode: "KW 28", wert: 5 },
    { periode: "KW 29", wert: 10 },
  ],
  storyText: "Ziel 10 Verträge/Woche weiter aktiv verfolgen",
  handlung: {
    rot: "Wochenplanung optimieren, Nachfass-Rhythmus beschleunigen",
    gelb: "KW 26+27 Peak-Bedingungen analysieren und replizieren",
  },
};

// ============================================================
// KPI 6: Telefonate pro Stunde
// Intervall: wöchentlich
// (nicht im Rendering, aber Daten bleiben erhalten)
// ============================================================
const KPI_TELEFONATE = {
  label: "Telefonate pro Stunde",
  kurzlabel: "Telefonate/h",
  einheit: "/h",
  intervall: "wöchentlich",
  kategorie: "vertrieb",
  prioritaet: "sek",
  schwpiegel: { gruen: 11.5, gelb: 8.0 },
  ziel: 11.5,
  teamAktuell: 8.98,
  teamTrend: [
    { periode: "KW 5", wert: 8.21 },
    { periode: "KW 6", wert: 7.48 },
    { periode: "KW 7", wert: 10.21 },
    { periode: "KW 8", wert: 10.62 },
    { periode: "KW 9", wert: 10.16 },
    { periode: "KW 10", wert: 4.84 },
    { periode: "KW 11", wert: 10.96 },
    { periode: "KW 12", wert: 7.50 },
  ],
  mitarbeiter: {
    fatima: {
      aktuell: 9.15,
      trend: [
        { periode: "KW 5", wert: 7.41 },
        { periode: "KW 6", wert: 6.45 },
        { periode: "KW 7", wert: 10.25 },
        { periode: "KW 8", wert: 11.23 },
        { periode: "KW 9", wert: 10.88 },
        { periode: "KW 12", wert: 6.49 },
      ],
    },
    sara: {
      aktuell: 8.78,
      trend: [
        { periode: "KW 7", wert: 10.16 },
        { periode: "KW 8", wert: 9.63 },
        { periode: "KW 9", wert: 9.30 },
        { periode: "KW 10", wert: 4.84 },
        { periode: "KW 11", wert: 9.41 },
        { periode: "KW 12", wert: 10.22 },
      ],
    },
  },
};

// ============================================================
// KPI 7: Verträge pro Stunde
// (nicht im Rendering, aber Daten bleiben erhalten)
// ============================================================
const KPI_VERTRAEGE = {
  label: "Verträge pro Stunde",
  kurzlabel: "Verträge/h",
  einheit: "/h",
  intervall: "wöchentlich",
  kategorie: "vertrieb",
  prioritaet: "sek",
  schwpiegel: { gruen: 0.50, gelb: 0.20 },
  ziel: 0.50,
  teamAktuell: 0.13,
  teamTrend: [
    { periode: "KW 5", wert: 0.13 },
    { periode: "KW 6", wert: 0.14 },
    { periode: "KW 7", wert: 0.23 },
    { periode: "KW 8", wert: 0.06 },
    { periode: "KW 9", wert: 0.02 },
    { periode: "KW 10", wert: 0.22 },
    { periode: "KW 11", wert: 0.14 },
    { periode: "KW 12", wert: 0.12 },
  ],
  mitarbeiter: {
    fatima: {
      aktuell: 0.19,
      trend: [
        { periode: "KW 5", wert: 0.14 },
        { periode: "KW 6", wert: 0.29 },
        { periode: "KW 7", wert: 0.41 },
        { periode: "KW 8", wert: 0.10 },
        { periode: "KW 9", wert: 0.00 },
        { periode: "KW 12", wert: 0.16 },
      ],
    },
    sara: {
      aktuell: 0.06,
      trend: [
        { periode: "KW 7", wert: 0.05 },
        { periode: "KW 8", wert: 0.00 },
        { periode: "KW 9", wert: 0.05 },
        { periode: "KW 10", wert: 0.22 },
        { periode: "KW 11", wert: 0.05 },
        { periode: "KW 12", wert: 0.00 },
      ],
    },
  },
};

// ============================================================
// KPI 8: Grafikabschluss bis Auslieferung
// Intervall: monatlich
// Quelle: 02_Excel_Quelldaten/Grafikabschluss_bis_Auslieferung.xlsx
// ACHTUNG: NIEDRIG = GUT (invertiert)
// Berechnung: nur 2026-Auslieferungen (55 Projekte), Ø 70.2 Tage
// ============================================================
const KPI_GRAFIK = {
  label: "Grafikabschluss bis Auslieferung",
  kurzlabel: "Grafik → Auslieferung",
  einheit: " Tage",
  intervall: "monatlich",
  kategorie: "fulfillment",
  prioritaet: "sek",
  verantwortlich: "Institutionsbetreuung",
  invertiert: true,
  schwpiegel: { gruen: 60, gelb: 80 },
  aktuell: 70.2,  // Ø 2026 (55 Projekte)
  ziel: 60,
  showLetzteWochen: 3,
  trend: [
    { periode: "Jan 26", wert: 97.0 },
    { periode: "Feb 26", wert: 84.0 },
    { periode: "Mrz 26", wert: 71.1 },
    { periode: "Apr 26", wert: 53.4 },
  ],
  storyText: "Q1 → Q2 deutlicher Fortschritt: 97 → 53 Tage",
  handlung: {
    rot: "Bottleneck im Grafik-Prozess identifizieren, Vorlaufzeit prüfen",
    gelb: "Standardprozess für Wiederholer weiter verkürzen",
  },
};
