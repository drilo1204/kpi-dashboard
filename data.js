// ============================================================
// KPI DASHBOARD – DATEN & KONFIGURATION
// ============================================================
// Diese Datei ist die EINZIGE Datei, die du bearbeiten musst.
// Aktualisiere die Zahlen und speichere – fertig.
// ============================================================

const DASHBOARD_CONFIG = {
  titel: "Partner & Friends – KPI Dashboard",
  letzteAktualisierung: "05.08.2026",
  aktuelleKW: "KW 32",
  aktuellerMonat: "August 2026",
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
// Berechnung: 47 von 87 Auslieferungen Jan–Jul 2026 (ohne Stadt Göttingen)
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
  aktuell: 54.0,
  ziel: 65,
  showLetzteWochen: 3,
  trend: [
    { periode: "Jan 26", wert: 33.3 },
    { periode: "Feb 26", wert: 78.6 },
    { periode: "Mrz 26", wert: 76.2 },
    { periode: "Apr 26", wert: 47.1 },
    { periode: "Mai 26", wert: 57.1 },
    { periode: "Jun 26", wert: 30.8 },
    { periode: "Jul 26", wert: 25.0 },
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
// Berechnung: 75 von 87 Auslieferungen Jan–Jul 2026 (ohne Stadt Göttingen)
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
  aktuell: 86.2,
  ziel: 90,
  showLetzteWochen: 3,
  trend: [
    { periode: "Jan 26", wert: 33.3 },
    { periode: "Feb 26", wert: 92.9 },
    { periode: "Mrz 26", wert: 81.0 },
    { periode: "Apr 26", wert: 94.1 },
    { periode: "Mai 26", wert: 100 },
    { periode: "Jun 26", wert: 84.6 },
    { periode: "Jul 26", wert: 83.3 },
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
// Berechnung: Q2 26 aus beiden Umfragen zusammen: 17 Rückmeldungen
//   13 Promotoren (9-10), 3 Passive (7-8), 1 Kritiker (0-6)
//   NPS = (13-1)/17 × 100 = 70.6
// Hinweis: NPS_Institutionsbetreuung-3.xlsx NICHT als Quelle (endet Sep 2025)
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
  aktuell: 70.6,
  ziel: 60,
  showLetzteWochen: 3,
  trend: [
    { periode: "Q2 25", wert: 71.4 },
    { periode: "Q3 25", wert: 75.0 },
    { periode: "Q2 26", wert: 70.6 },
  ],
  details: {
    rueckmeldungen: 17,
    promotoren: 13,
    passive: 3,
    kritiker: 1,
  },
  storyText: "Q2 26: 70,6 · Vorjahr Q2 25: 71,4 (−0,8 pp) — starkes Ergebnis",
  handlung: {
    rot: "Kritisches Feedback direkt zurückspiegeln, Ursache dokumentieren",
    gelb: "Neutrale Rückmeldungen aktiv nachbereiten",
  },
};

// ============================================================
// KPI 4: Leads Conversion Rate
// Intervall: wöchentlich
// Quelle: 02_Excel_Quelldaten/ConversionRate.xlsx → Sheet Leads Rohdaten
// Stand 05.08.2026: Reife-Konzept + 5-V-Schwelle deaktiviert
// Alle 3 Hauptverkäufer mit Total-Werten seit Jan 2026
// Berechnung teamAktuell: 115 Verträge / 754 Leads = 15.3 %
// Berechnung teamTrend: nur abgeschlossene Monate (April ausgelassen: nur 2 Leads)
// Mitarbeiter-Quartale: Q1 (Jan–Mrz), Q2 (Apr–Jun) | Juli läuft noch → Q3 nicht zeigen
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
  teamAktuell: 15.3,
  showLetzteWochen: 2,
  teamTrend: [
    { periode: "Jan 26", wert: 8.9 },
    { periode: "Feb 26", wert: 20.7 },
    { periode: "Mrz 26", wert: 5.6 },
    { periode: "Mai 26", wert: 12.5 },
    { periode: "Jun 26", wert: 37.4 },
    { periode: "Jul 26", wert: 4.1 },
  ],
  storyText: "Starkes Juni-Ergebnis: Team-Peak 37 % — Fatima und David legen kräftig zu",
  handlung: {
    rot: "Nachfassen bei laufenden Leads, gute Praxis austauschen",
    gelb: "Juni-Peak-Bedingungen reproduzieren, Top-Skripte teilen",
  },
  mitarbeiter: {
    fatima: {
      aktuell: 14.4,
      quartale: [
        { periode: "Jan-Mrz", wert: 10.0 },
        { periode: "Apr-Jun", wert: 15.7 },
      ],
    },
    gabriella: {
      aktuell: 6.7,
      quartale: [
        { periode: "Jan-Mrz", wert: 5.6 },
        { periode: "Apr-Jun", wert: 10.0 },
      ],
    },
    david: {
      aktuell: 21.6,
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
// Berechnung aktuell: 196 Verträge / 31 KWs mit ≥1 Vertrag = 6.3 Verträge/Woche
//   (Nur KWs mit mindestens einem Vertrag zählen als Nenner, nicht alle KWs)
// Trend: pro KW ab KW 2 bis inkl. KW 31 (letzte abgeschlossene KW)
//   KW 32 läuft noch → nicht aufnehmen
// KW 31 (Nachtrag 04.08.): 11 Verträge — David 10, Drilan 1
// Mitarbeiter-Quartale: Q1 (Jan–Mrz), Q2 (Apr–Jun) | Q3 (Juli läuft) nicht zeigen
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
  aktuell: 6.3,
  ziel: 10,
  showLetzteWochen: 3,
  mitarbeiterOhneAmpel: true,
  mitarbeiter: {
    fatima: {
      aktuell: 76,
      quartale: [
        { periode: "Jan-Mrz", wert: 34 },
        { periode: "Apr-Jun", wert: 31 },
      ],
    },
    gabriella: {
      aktuell: 43,
      quartale: [
        { periode: "Jan-Mrz", wert: 14 },
        { periode: "Apr-Jun", wert: 23 },
      ],
    },
    david: {
      aktuell: 35,
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
    { periode: "KW 28", wert: 4 },
    { periode: "KW 29", wert: 10 },
    { periode: "KW 30", wert: 4 },
    { periode: "KW 31", wert: 11 },
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
// Quelle: 02_Excel_Quelldaten/Grafikabschluss_bis_Auslieferung.xlsx → Sheet Rohdaten
// ACHTUNG: NIEDRIG = GUT (invertiert)
// Berechnung: nur 2026-Auslieferungen (55 Projekte Jan–Apr), Ø 70.2 Tage
// Trend: monatlich Jan–Apr (Mai–Jul noch keine Auslieferungen in 2026)
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
  aktuell: 70.2,
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
