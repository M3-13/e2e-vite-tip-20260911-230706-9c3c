# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Klare, helle Finanz-Tool-Ästhetik nach Linear/Stripe-Vorbild: ruhiger, neutraler Hintergrund, kräftiges Grün als Akzent für Aktionen und Geldbeträge, viel Weißraum für die bindende Vorgabe „schlicht und aufgeräumt“.

## Colors

- `--color-bg`: **#F7F8FA**
- `--color-surface`: **#FFFFFF**
- `--color-fg`: **#101828**
- `--color-muted`: **#667085**
- `--color-border`: **#E4E7EC**
- `--color-accent`: **#0E9F6E**
- `--color-accent_hover`: **#0B8A5F**
- `--color-accent_active`: **#087A54**
- `--color-accent_soft`: **#E6F6EF**
- `--color-danger`: **#B42318**
- `--color-danger_soft`: **#FEF3F2**

## Typography

- `font_family`: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif
- `heading_weight`: 600
- `body_weight`: 400

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 16px
- `--radius-pill`: 999px

## Components

### Button

Primär: bg=accent, Text #FFFFFF, padding 12px 24px, radius md, font-weight 600, min-height 44px (Touch-Ziel), border none; hover bg=accent_hover; active bg=accent_active + 1px innerer Versatz; disabled bg=accent opacity 0.5, cursor not-allowed. Fokus: 2px outline #0E9F6E mit 2px Abstand.

### Card

bg=surface, border 1px solid border, radius lg, padding 24px (mobile) bzw. 32px (ab 640px), Box-Shadow 0 1px 2px rgba(16,24,40,0.06).

### Input

Label: 14px, muted, font-weight 500, margin-bottom 8px. Feld: bg=surface, border 1px solid border, radius md, padding 12px, min-height 44px, fg; focus border=accent + 3px Box-Shadow rgba(14,159,110,0.15). Invalid: border=danger, bg=danger_soft.

### ResultRow

Zeile mit Label links (14px, muted) und Betrag rechts (20px, font-weight 600, fg); Trennung durch 1px border-bottom außer beim letzten Element; Highlight-Zeile (Betrag pro Person) bg=accent_soft, radius md, padding 12px, Betrag in accent.

### ErrorMessage

Text 14px, danger, padding 12px, bg=danger_soft, radius md, border 1px solid #FECDCA; margin-top 16px; Icon nicht zwingend.

## Layout Principles

- Container max-width 480px, zentriert; Seite mittig ausgerichtet (Flex, min-height 100vh) für eine fokussierte Ein-Karten-Ansicht.
- Abstand zwischen Eingabefeldern 16px, zwischen Eingabegruppe und Ergebnissen 24px.
- Breakpoints: Basis mobile-first, ab 640px Card-Padding 32px und Ergebnis-Beträge 24px.
- Zahlen rechtsbündig, Labels linksbündig; konsistente vertikale Achse für alle Felder.
