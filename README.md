# Trinkgeld-Rechner

Eine schlichte Single-Page-Web-App, die aus Betrag, Trinkgeld-Prozent und
Personenzahl live Trinkgeld, Gesamtbetrag und Betrag pro Person berechnet und
auf ganze Cent (zwei Nachkommastellen) kaufmännisch rundet. Die Berechnung liegt
in einer eigenen, reinen Funktion (`src/lib/calculator.ts`); die Oberfläche
aktualisiert die Ergebnisse bei jeder Eingabe sofort.

## Tech-Stack

- **Sprache:** TypeScript
- **Framework:** React
- **Build-Tool:** Vite
- **Test-Runner:** Vitest
- **Paketmanager:** npm

## Installation

```bash
npm ci
```

## Entwicklung

```bash
npm run dev
```

Öffne anschließend die angezeigte URL (Standard: `http://localhost:5173`).

## Produktions-Build

```bash
npm run build
```

Der Build erzeugt den statischen Output im Ordner `dist/`. Zur lokalen
Vorschau des gebauten Standes:

```bash
npm run preview
```

## Bedienung

1. Gib im Feld **Betrag** den Rechnungsbetrag ein (z. B. `50`).
2. Gib im Feld **Trinkgeld-Prozent** den Prozentsatz ein (z. B. `10`).
3. Gib im Feld **Personenzahl** die Anzahl der Personen ein (z. B. `2`).

Die Ausgabefelder **Trinkgeld**, **Gesamtbetrag** und **Betrag pro Person**
werden bei jeder Eingabe live neu berechnet und auf zwei Nachkommastellen
formatiert. Bei ungültiger Eingabe (z. B. Personenzahl 0, negativer Betrag oder
leeres Feld) erscheint eine Fehlermeldung; nach Korrektur verschwindet sie und
das Ergebnis wird wieder angezeigt.

## Features

- Drei kontrollierte Eingabefelder (Betrag, Trinkgeld-Prozent, Personenzahl)
- Drei live aktualisierte Ausgabefelder (Trinkgeld, Gesamtbetrag, Betrag pro Person)
- Kaufmännische Rundung auf zwei Nachkommastellen
- Fehleranzeige bei ungültiger Eingabe
- Reine, separat testbare Berechnungsfunktion
- Rendering ausschließlich als Textknoten (keine HTML-Injektion)

## Tests

```bash
npm test
```
