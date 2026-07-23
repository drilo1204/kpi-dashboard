// ============================================================
// KPI DASHBOARD – DATEN & KONFIGURATION
// ============================================================
// Diese Datei ist die EINZIGE Datei, die du bearbeiten musst.
// Aktualisiere die Zahlen und speichere – fertig.
// ============================================================

const DASHBOARD_CONFIG = {
  titel: "Partner & Friends – KPI Dashboard",
  letzteAktualisierung: "22.07.2026",
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
  aktuell: 58.1,  // 43 von 74 Auslieferungen (Stadt Göttingen ausgeklammert; Juli läuft noch)
  ziel: 65,
  trend: [
    { periode: "Jan 26", wert: 33.3 },
    { periode: "Feb 26", wert: 78.6 },
    { periode: "Mrz 26", wert: 80 },   // ohne Stadt Göttingen: 16/20
    { periode: "Apr 26", wert: 47.1 },
    { periode: "Mai 26", wert: 42.9 },
    { periode: "Jun 26", wert: 30.8 },
    // Jul 26 läuft noch – erst nach Monatsabschluss aufnehmen
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
  aktuell: 86.5,  // 64 von 74 Auslieferungen (Stadt Göttingen ausgeklammert; Juli läuft noch)
  ziel: 90,
  trend: [
    { periode: "Jan 26", wert: 33.3 },
    { periode: "Feb 26", wert: 92.9 },
    { periode: "Mrz 26", wert: 80 },   // ohne Stadt Göttingen: 16/20
    { periode: "Apr 26", wert: 94.1 },
    { periode: "Mai 26", wert: 100 },
    { periode: "Jun 26", wert: 84.6 },
    // Jul 26 läuft noch – erst nach Monatsabschluss aufnehmen
  ],
  storyText: "Konstant hohe Referenzquote — 90 %-Ziel in Reichweite",
  handlung: null,  // im Ziel — keine Handlung nötig
};

// ============================================================
// KPI 3: NPS Institutionsbetreuung
// Intervall: monatlich
// Quellen:
//   - 02_Excel_Quelldaten/Kopie von Wie läufts mit Eurem Fahrzeug  Anhänger.xlsx
//   - 02_Excel_Quelldaten/Kopie von Wie läufts mit Eurem Torzähler.xlsx
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
  aktuell: 70.6,  // 13 Promotoren – 1 Detraktor von 17 Befragungen
  ziel: 60,
  trend: [
    { periode: "Apr 26", wert: 85.7 },
    { periode: "Mai 26", wert: 60 },
  ],
  details: {
    rueckmeldungen: 17,
    promotoren: 13,
    passive: 3,
    kritiker: 1,
  },
  storyText: "Sehr gute Weiterempfehlungsrate — Ziel klar erreicht",
  handlung: {
    rot: "Kritisches Feedback direkt zurückspiegeln, Ursache dokumentieren",
    gelb: "Neutrale Rückmeldungen aktiv nachbereiten",
  },
};

// ============================================================
// KPI 4: Leads Conversion Rate
// Intervall: monatlich
// Quelle: 02_Excel_Quelldaten/ConversionRate.xlsx
// Stand 15.07.2026: Reife-Konzept + 5-V-Schwelle deaktiviert (auf Wunsch).
// Alle 4 Hauptverkäufer werden mit Total-Werten seit Jan 2026 gezeigt.
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
  // Team-Conv-Rate der 3 Hauptverkäufer, kumuliert seit Jan 2026 (alle Leads):
  // 624 Leads → 89 Verträge aus Leads-Quelle.
  teamAktuell: 14.5,
  showLetzteWochen: 2,  // nur Mai + Jun als Detail-Chips (Sparkline zeigt weiter alles)
  teamTrend: [
    { periode: "Jan 26", wert: 8.9 },   // 13 V / 146 Leads
    { periode: "Feb 26", wert: 20.7 },  // 6 V / 29 Leads
    { periode: "Mrz 26", wert: 5.6 },   // 7 V / 125 Leads
    // Apr 26 bewusst weggelassen: nur 2 Leads (statistisch nicht aussagekräftig)
    { periode: "Mai 26", wert: 12.5 },  // 29 V / 232 Leads
    { periode: "Jun 26", wert: 37.4 },  // 37 V / 99 Leads (Peak)
  ],
  storyText: "Starkes Juni-Ergebnis: Team-Peak 37 % — Fatima und David legen kräftig zu",
  handlung: {
    rot: "Nachfassen bei laufenden Leads, gute Praxis austauschen",
    gelb: "Juni-Peak-Bedingungen reproduzieren, Top-Skripte teilen",
  },
  // Alle 3 Hauptverkäufer werden angezeigt (Total-Werte seit Jan 2026).
  mitarbeiter: {
    fatima: {
      aktuell: 12.6,  // 388 Leads → 49 Verträge (Gesamt)
      quartale: [
        { periode: "Jan-Mrz", wert: 10.0 },  // 21/210
        { periode: "Apr-Jun", wert: 15.7 },  // 28/178
      ],
    },
    gabriella: {
      aktuell: 6.7,   // 120 Leads → 8 Verträge (Gesamt)
      quartale: [
        { periode: "Jan-Mrz", wert: 5.6 },   // 5/90
        { periode: "Apr-Jun", wert: 10.0 },  // 3/30
      ],
    },
    david: {
      aktuell: 28.0,  // 125 Leads → 35 Verträge (Neuzugang seit Mai)
      quartale: [
        { periode: "Apr-Jun", wert: 28.0 },  // 35/125 – Q1 keine Leads
      ],
    },
  },
};

// ============================================================
// KPI 5: Vertragseingänge pro Woche
// Intervall: wöchentlich
// Quelle: 02_Excel_Quelldaten/ConversionRate.xlsx
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
  aktuell: 6.8,  // Ø Verträge pro Woche (178 Verträge / 26 KWs, ohne laufende KW 30)
  ziel: 10,
  showLetzteWochen: 3,
  // Verkäufer-Übersicht: absolute Verträge Total + pro Quartal.
  // Fatima: Q1/Q2 als "real eingeholt" (vom Nutzer bestätigt, inkl. verspäteter Erfassungen aus KW 27-29).
  // Gabriella + David: Excel-Ist (keine manuellen Korrekturen aktuell).
  mitarbeiterOhneAmpel: true,
  mitarbeiter: {
    fatima: {
      aktuell: 72,   // Total Verträge 2026 (Rohdaten, ohne laufende KW 30)
      quartale: [
        { periode: "Jan-Mrz", wert: 34 },  // real eingeholt
        { periode: "Apr-Jun", wert: 31 },  // real eingeholt
      ],
    },
    gabriella: {
      aktuell: 42,   // Total Rohdaten (ohne KW 30)
      quartale: [
        { periode: "Jan-Mrz", wert: 14 },
        { periode: "Apr-Jun", wert: 23 },
      ],
    },
    david: {
      aktuell: 16,   // Total Rohdaten
      quartale: [
        { periode: "Apr-Jun", wert: 7 },   // KW 24 (Nachtrag 08.06.) + KW 26
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
    // KW 30 läuft noch – erst nach Wochenabschluss aufnehmen
  ],
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
  aktuell: 78.6,  // Ø 2026 (84 Projekte) — nach Format-Korrektur (Mai/Jun jetzt sichtbar)
  ziel: 60,
  showLetzteWochen: 3,
  trend: [
    { periode: "Jan 26", wert: 215.5 },  // 2 Projekte (Ausreißer: sehr alte Aufträge)
    { periode: "Feb 26", wert: 94.1 },   // 18 Projekte
    { periode: "Mrz 26", wert: 74.7 },   // 23 Projekte
    { periode: "Apr 26", wert: 67.2 },   // 18 Projekte
    { periode: "Mai 26", wert: 68.5 },   // 11 Projekte
    { periode: "Jun 26", wert: 66.3 },   // 12 Projekte
  ],
  storyText: "Q2 stabil um 66–68 Tage — deutlicher Fortschritt seit Februar (94 → 66)",
  handlung: {
    rot: "Bottleneck im Grafik-Prozess identifizieren, Vorlaufzeit prüfen",
    gelb: "Standardprozess für Wiederholer weiter verkürzen",
  },
};
