# KPI Dashboard – Regelwerk für Auto-Update

> **Zweck:** Diese Datei enthält alle Regeln, nach denen `data.js` aus den Excel-Rohdaten berechnet wird. Sie ist die Referenz für den automatisierten wöchentlichen Update-Prozess (Make.com + Anthropic API).
>
> **Nicht ändern ohne Rücksprache mit Drilan.**

---

## 0. Allgemeine Prinzipien

### 0.1 Datenzeitraum
- Es werden **ausschließlich 2026er-Daten** angezeigt. Keine 2025-Rückschau.
- Historische Vorjahresvergleiche nur, wenn explizit angefragt.
- **Ausnahme NPS:** wird quartalsweise erhoben, siehe 3.3 — historische Quartale seit Q2 25 dürfen im Trend stehen.

### 0.2 Nur abgeschlossene Perioden anzeigen
- **Wöchentliche Trends:** Nur Kalenderwochen, deren Sonntag < heute ist. Laufende Woche wird nicht aufgenommen.
- **Monatliche Trends:** Nur Monate, deren letzter Tag < heute ist. Laufender Monat wird nicht aufgenommen.
- **Quartale:** Ein Quartal wird erst nach Ablauf gezeigt (Q2 = Apr-Jun erscheint ab 01.07.).
- Ausnahme: Wenn ein Quartal-Chip die einzige Datenbasis für einen neuen Verkäufer ist, kann er auch teilweise gezeigt werden (mit „NEU"-Badge).
- **Aktueller Monat gilt für `aktuell`-Wert ebenfalls als tabu.** Er darf nicht in Total-Aggregate einfließen. Siehe 3.1 und 3.2.

### 0.3 Ampel-Farben (Standard, kann pro KPI abweichen)
- Bei normaler Skalierung: `wert >= gruen` → grün, `wert >= gelb` → gelb, sonst rot
- Bei invertierter Skalierung (z. B. Grafik-Tage): `wert <= gruen` → grün, `wert <= gelb` → gelb, sonst rot

### 0.4 Verkäufer-taktvolle Formulierungen (WICHTIG)
Das Dashboard wird auch von den Verkäufern selbst gesehen. Deshalb:
- **Keine Vereins-/Institutionsnamen** in Storytexten (auch nicht bei Detraktoren)
- **Keine Kritik-Formulierungen** wie „greift nicht", „schlechte Leistung", „Handlungsbedarf klar"
- **Keine Fachbegriffe** wie „Detraktor", „Lead-Qualifizierung schärfen", „Vertriebs-Skript reviewen"
- **Positiv-neutral formulieren:** „Ziel rückt näher", „Bewertungen weiter aktiv einholen", „Starkes Ergebnis"
- Bei Erfolg: Namen ehrlich nennen („Fatima und David legen kräftig zu")
- Bei Rückstand: Team-Ansatz, keine Einzelperson beschämen

### 0.5 Datenherkunft (Prioritäten bei Konflikten)
- **Rohdaten-Sheet immer bevorzugen** vor aggregierten KW-Tabellen (Excel-Aggregate hinken oft hinterher)
- Bei Diskrepanzen: Der Rohdaten-Wert ist die Wahrheit, KW-Tabellenwert wird ignoriert

### 0.6 Datum-Kontext (verbindlich, vom Skript vorgegeben)
Der Auto-Update-Automat injiziert bei jedem Lauf einen **DATUM-KONTEXT-Block** in den Prompt, mit deterministisch berechneten Werten:

- `heute` (heutiges Datum im Format DD.MM.YYYY)
- `aktuelle_kw_label` (z. B. `KW 32`) → **läuft noch, NIE im Trend oder Aggregate**
- `letzte_abg_kw_label` (z. B. `KW 31`) → **muss im Trend enthalten sein**
- `aktueller_monat_label` (z. B. `August 2026`) → **läuft noch, NIE im Trend oder Aggregate**
- `letzter_monat_label` (z. B. `Juli 2026`) → **muss im Trend enthalten sein**

**Diese Werte sind verbindlich. Nicht selbst nachrechnen, nicht aus Excel-Zellen ableiten, nicht raten.** Wenn der Prompt-Kontext sagt „aktuelle KW = KW 32", dann ist KW 31 abgeschlossen und **muss** in `KPI_VERTRAGSEINGAENGE_WOCHE.trend` stehen — auch wenn Excel-Aggregate (Dashboard-Sheet) noch 0 zeigen. Rohdaten sind maßgeblich.

`DASHBOARD_CONFIG.aktuelleKW`, `DASHBOARD_CONFIG.aktuellerMonat` und `DASHBOARD_CONFIG.letzteAktualisierung` werden aus dem Datum-Kontext übernommen.

---

## 1. Datei-Struktur

### 1.1 Quelldateien (in `02_Excel_Quelldaten/`)
- `ConversionRate.xlsx` → KPI 4 (Conversion Rate) + KPI 5 (Vertragseingänge)
- `Google-Bewertungen_Referenzen_Auslieferungen.xlsx` → KPI 1 + KPI 2
- `Grafikabschluss_bis_Auslieferung.xlsx` → KPI 8
- `Kopie von Wie läufts mit Eurem Fahrzeug  Anhänger.xlsx` → KPI 3 NPS (Fahrzeug-Umfrage)
- `Kopie von Wie läufts mit Eurem Torzähler.xlsx` → KPI 3 NPS (Torzähler-Umfrage)
- `NPS_Institutionsbetreuung-3.xlsx` → **NICHT als Quelle nutzen.** Legacy-Datei mit Rohdaten bis Sep 2025. Wird ignoriert.

### 1.2 Ziel-Datei
- `data.js` im Repo-Root → einzige Datenquelle für das Dashboard
- Struktur nie ändern, nur Werte in bestehenden Feldern aktualisieren

### 1.3 Deploy-Kette
- Update `data.js` → Git-Commit → Push nach `drilo1204/kpi-dashboard/main` → Netlify auto-deploy → live auf `pfkpi.netlify.app` in ~30 Sek

---

## 2. Aktive Mitarbeiter (Stand 22.07.2026)

**Aktive Hauptverkäufer:** Fatima, Gabriella, David
**Nicht mehr im Team:** Sara Cierpial (raus), Gerd Henke (raus zum 15.07.2026)
**Weitere aktive Mitarbeiter (in KPI 5 als Sonstige):** Nicole Schmid, Drilan Veseli, Salvatore Domante, Matthias Gugel

---

## 3. KPI-Spezifische Regeln

### 3.1 KPI 1 Google-Bewertungsquote
- **Quelle:** `Google-Bewertungen_Referenzen_Auslieferungen.xlsx` → Sheet `Rohdaten`
- **Ausklammern:** Institutionstyp "Gemeinde / Kommune" (dürfen keine Google-Bewertung abgeben)
- **AKTUELL:** Google-Bew erhalten / Auslieferungen (ohne Kommunen) — **nur bis inkl. letzten abgeschlossenen Monat.**
- **Trend:** monatlich, endet beim letzten abgeschlossenen Monat.
- **Der laufende Monat wird NIE aufgenommen — weder im Trend noch im Total-Aggregate.** Er erscheint erst am 1. des Folgemonats.
- **Beispiel Stichtag 30.07.2026:** aktuell und Trend enden bei Juni 26. Juli erscheint erst ab 01.08.
- **Ziel:** 65%, Schwellen gruen 65 gelb 50
- **Verantwortlich:** "Institutionsbetreuung"

### 3.2 KPI 2 Referenzquote
- Analog KPI 1 (dieselbe Excel, ohne Kommunen)
- **AKTUELL:** Referenzen erhalten / Auslieferungen (ohne Kommunen) — **nur bis inkl. letzten abgeschlossenen Monat.**
- **Trend:** monatlich, endet beim letzten abgeschlossenen Monat.
- **Der laufende Monat wird NIE aufgenommen.** Gleiches Beispiel wie 3.1.
- **Ziel:** 90%, Schwellen gruen 90 gelb 65

### 3.3 KPI 3 NPS Institutionsbetreuung
- **Quellen (aktuell):** BEIDE Umfrage-Excels zusammen: `Kopie von Wie läufts mit Eurem Fahrzeug Anhänger.xlsx` + `Kopie von Wie läufts mit Eurem Torzähler.xlsx`
- **NICHT nutzen:** `NPS_Institutionsbetreuung-3.xlsx` — Legacy-Datei, endet Sep 2025. Ignorieren.
- **Klassifikation:**
  - Numerisch: 9-10 Promotor, 7-8 Passiv, 0-6 Detraktor
  - "Ich würde Euch uneingeschränkt weiterempfehlen!" → Promotor (10)
  - "Auf gar keinen Fall!" → Detraktor (0)
  - Leere NPS-Antworten überspringen
- **Formel:** `(Promotoren - Detraktoren) / Gesamt × 100`
- **Intervall:** quartalsweise erhoben (Q1 = Jan-Mrz, Q2 = Apr-Jun usw.)
- **Trend:** **maximal die letzten 3 Quartale mit Daten, frühestens ab Q2 2025.** Keine 2024-Daten anzeigen. Quartale ohne Rückläufe überspringen.
- **Q2 26 vorläufig-Regel:** solange Juni-Rückläufe fehlen, aus Apr+Mai berechnen und als „(vorläufig)" markieren. Wenn keine neuen Rückläufe seit letztem Lauf: bestehende data.js-Werte unverändert lassen.
- **Ziel:** 60, Schwellen gruen 60 gelb 30
- **Intervall-Label:** "quartalsweise"

### 3.4 KPI 4 Leads Conversion Rate
- **Quelle:** `ConversionRate.xlsx` → Sheet `Leads Rohdaten`
- **Modus (Stand 15.07.2026):** Reife-Konzept + 5-V-Schwelle DEAKTIVIERT
- **Basis:** nur 3 Hauptverkäufer (Fatima, Gabriella, David); Sara/andere ignorieren
- **teamAktuell** = Σ Verträge / Σ Leads der 3 Hauptverkäufer
- **teamTrend** = pro Monat, jeweils Verträge/Leads der 3
- **Monats-Ausschluss:** April 26 immer weglassen (nur 2 Leads → statistisch dünn). Andere Monate mit < 5 Leads prüfen.
- **Mitarbeiter-Quartale:** Q1 = Jan+Feb+Mrz, Q2 = Apr+Mai+Jun. Bei Neuzugang nur Q2 mit NEU-Badge.
- **Ziel:** 20%, Schwellen gruen 20 gelb 10
- **Verantwortlich:** "Vertriebsleitung", Priorität "prio"
- **showLetzteWochen:** 2
- **Intervall-Label:** "wöchentlich"
- **Rendering:** `renderMaCard()` (weil `mitarbeiter`-Block vorhanden)

### 3.5 KPI 5 Vertragseingänge pro Woche
- **Quelle:** `ConversionRate.xlsx` → Sheet `Vertragseingänge` (Rohdaten, NICHT die KW-Tabelle im Dashboard-Sheet)
- **Excel-Struktur ab Juli 2026:** Header `KW | Datum | Jahr | Monat | Verkäufer | Institution | Produktart | Quelle | Kampagne | Status | Bemerkung`. Nutzer trägt aus: Datum, Jahr, Monat, Verkäufer, Institution, Produktart, Quelle, Kampagnen-Monat. KW muss aus Datum berechnet werden (ISO-Kalenderwoche).
- **Team-Total:** alle Zeilen mit gefülltem Verkäufer zählen (auch ohne Nr., auch Nachträge, auch mit leerer KW-Spalte — KW aus Datum ableiten)
- **aktuell** = Total-Verträge / **Anzahl KWs mit ≥1 Vertrag** (bis inkl. letzter abgeschlossener KW, siehe 0.6). **Nicht** durch die Gesamtzahl aller KWs teilen — nur durch aktive KWs.
- **Trend:** pro KW ab KW 2, bis inkl. `letzte_abg_kw_label` aus dem Datum-Kontext (0.6). Aktuelle laufende KW IMMER weglassen.
- **Mitarbeiter-Blöcke:** nur Fatima, Gabriella, David
- **Wichtig (Erfassungsverzug):** Fatima-Werte werden manchmal manuell korrigiert (bis zu 3 Wochen Verzug). Auto-Update übernimmt Excel-Ist. Bei Diskrepanz zur vorherigen data.js: im Commit-Log dokumentieren.
- **mitarbeiterOhneAmpel:** true (Chips neutral, nur Delta-Pfeil farbig)
- **Quartals-Zuordnung:** KW 1-13 → Q1 (Jan-Mrz), KW 14-26 → Q2 (Apr-Jun), KW 27+ → Q3 (Jul-Sep, noch nicht zeigen bis abgeschlossen)
- **Ziel:** 10 Verträge/Woche, Schwellen gruen 10 gelb 7
- **Verantwortlich:** "Vertriebsleitung", Priorität "prio"
- **showLetzteWochen:** 3

### 3.6 KPI 6+7 Telefonate/h und Verträge/h
- **Status: NICHT gerendert.** Daten bleiben in data.js erhalten, Automat lässt sie unverändert.

### 3.7 KPI 8 Grafikabschluss bis Auslieferung
- **Quelle:** `Grafikabschluss_bis_Auslieferung.xlsx` → Sheet `Rohdaten`
- **KRITISCH — Format-Fix vor Berechnung:**
  - Excel speichert manche Datum-Zellen als Text. Prüfe Spalten D (Grafikabschluss) und E (Auslieferungsdatum):
    - Wenn Wert Typ `str` (z. B. "26.05.2026"): parsen als datetime, in Zelle zurückschreiben als datetime mit Format DD.MM.YYYY
  - Danach neu berechnen:
    - Spalte F (Produktionsdauer): `Auslieferungsdatum - Grafikabschluss` in Tagen
    - Spalte G (Jahr): aus Auslieferungsdatum
    - Spalte H (Quartal): Q{(monat-1)//3+1} {jahr}
    - Spalte I (Monat-Nr): aus Auslieferungsdatum
  - Excel-Datei speichern
- **Berechnung:** alle 2026-Zeilen (Auslieferungsjahr) einlesen
- **Total (aktuell):** Ø Produktionsdauer aller 2026
- **Trend:** pro Monat Ø Produktionsdauer
- **Ausreißer:** Monate mit wenigen Projekten (< 5) trotzdem drin behalten wenn mathematisch korrekt (Beispiel: Jan 26 mit 2 Projekten @ 215 Tage bleibt)
- **Ziel:** 60 Tage, Schwellen gruen 60 gelb 80 (INVERTIERT: niedrig = gut)
- **Invertiert:** true
- **Verantwortlich:** "Institutionsbetreuung"

---

## 4. Layout-Regeln

### 4.1 Grid
- 2 Reihen × 12 Spalten
- Jede Karte: `span 4` (3 Karten pro Reihe, alle gleich groß)
- Feste Reihenfolge:
  - Oben: KPI 4 Conversion, KPI 5 Vertragseingänge, KPI 3 NPS
  - Unten: KPI 1 Google, KPI 2 Referenz, KPI 8 Grafik

### 4.2 Kategorie-Gruppierung
- Vertrieb (indigo): KPI 4, KPI 5
- Kundenzufriedenheit (sky): KPI 1, KPI 2, KPI 3
- Fulfillment (purple): KPI 8

### 4.3 Delta-Zeile
- Nur EIN Chip: „vs. Vormonat/Vorwoche". Kein Jahresstart-Chip mehr.
- Prozent-KPIs: Suffix „pp" (Prozentpunkte)
- Invertierte KPIs: Delta-Farbe umgekehrt (weniger Tage = grün)

### 4.4 Ziel-Anzeige
- Prominenter Chip mit Hintergrund, Font 0.9rem
- Format: `Ziel: <wert><einheit>` (Ma-Card mit „· Team-Schnitt")

### 4.5 Sparkline
- Native Hover-Tooltips via SVG `<title>`
- Format: `<Periode>: <Wert><Einheit>`

---

## 5. Story-Text-Regeln

- Max. 1 Satz, ca. 90 Zeichen
- Ton: positiv oder neutral. Bei Erfolg Namen nennen. Bei Rückstand Team-Ansatz.
- **Verbotene Formulierungen:** „greift nicht", „Handlungsbedarf klar", „schwache Performance", Vereinsnamen, „Detraktor XYZ", „Vertriebs-Skript reviewen"
- **Empfohlene:** „Ziel X % rückt näher", „Konstant hohe Referenzquote", „Starkes Juni-Ergebnis"

---

## 6. Handlungs-Empfehlung (`handlung`-Feld)

- Nur bei rot/gelb anzeigen. Grün: `handlung: null`.
- Rot: klare sachliche Handlung, nicht defensiv
- Gelb: Verstärkung („Top-Skripte teilen")

---

## 7. Ausnahme-Regeln

### 7.1 Fatima Q2 Erfassungsverzug
- Nutzer korrigiert manuell: Q1=34, Q2=31 statt Excel-Ist Q1=30, Q2=24
- Auto-Update: Excel-Ist übernehmen, Delta zur vorherigen data.js im Commit-Log dokumentieren

### 7.2 David-Neuzugang
- Erst ab Mai 26 in Daten
- Historische Q1-Werte: KEIN Chip, KEIN Wert (nicht 0!)

### 7.3 Sara und Gerd (ausgeschieden)
- Sara: raus, historische Zeilen bleiben in Rohdaten, werden aber NICHT mehr aggregiert
- Gerd: ausgeschieden 15.07., analog

### 7.4 Nicole und Matthias
- Nicht als Hauptverkäufer sichtbar
- Verträge fließen in KW-Trend (Team-Ø/Woche), NICHT in KPI 4 Team-Wert

---

## 8. Änderungshistorie
- 08.05.2026: Initiale Regeln für Reife-Konzept + 5-V-Schwelle
- 15.07.2026: Reife-Konzept + 5-V-Schwelle deaktiviert
- 20.07.2026: Regel „nur abgeschlossene Perioden" eingeführt
- 22.07.2026: Juli-Werte aus KPI 1+2 raus (Juli läuft noch)
- 23.07.2026: Grafik-Format-Fix-Regel dokumentiert
- 23.07.2026: RULES.md als Referenz für Auto-Update-Agent erstellt
- 30.07.2026: Regel geschärft — KPI 1+2: aktueller Monat NIE einbeziehen (auch nicht in `aktuell`). NPS: nur Quartale ab Q2 25, `NPS_Institutionsbetreuung-3.xlsx` nicht mehr als Quelle. KPI 5: `aktuell` durch KWs mit ≥1 Vertrag teilen, nicht durch Gesamt-KW-Zahl.
- 04.08.2026: Regel 0.6 „Datum-Kontext" eingeführt. Grund: Automat vom 04.08. hat KW 31 fälschlich als „läuft noch" markiert. Ab jetzt injiziert das Python-Skript heute/aktuelle-KW/letzte-abg-KW/Monat verbindlich, AI darf diese Werte nicht ableiten oder überschreiben.

---

**Ende des Regelwerks.**
Bei Zweifelsfällen: Drilan fragen, nicht raten.
