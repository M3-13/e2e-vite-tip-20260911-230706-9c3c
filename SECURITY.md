VERDICT: APPROVED

## Sicherheitsbewertung

Geprüft wurden die Bereiche Secrets, Injection/Inputs, AuthN/AuthZ, Dependencies sowie Konfiguration/Transport. Die im Sprint-Spec vereinbarten Security-Kriterien sind:

- **AC-07** – Rendering ausschließlich als Textknoten; kein `dangerouslySetInnerHTML`, `innerHTML` o. Ä.
- **AC-08** – Eingabevalidierung vor Berechnung: numerischer Typ, Wertebereich, Ganzzahligkeit der Personenzahl.

### Erfüllung der Security-Kriterien

**AC-07 – keine HTML-Injektion**
- In `src/App.tsx` werden alle dynamischen Werte (`tip`, `total`, `perPerson`, `error`) ausschließlich als React-Textknoten in JSX verwendet: `{tip}`, `{total}`, `{perPerson}`, `{error}`.
- Es kommt kein `dangerouslySetInnerHTML`, kein direktes `innerHTML` und keine vergleichbare HTML-Injektion vor.
- Der Test in `src/App.test.tsx` prüft zusätzlich, dass kein `dangerouslySetInnerHTML`-Attribut und kein `<script` im gerenderten Markup erscheint.
- **Kein Verstoß.**

**AC-08 – robuste Eingabevalidierung**
- `src/lib/calculator.ts` verwendet `parseNumber` mit `Number.isFinite` und lehnt leere, nicht-numerische und nicht-endliche Werte ab.
- Negative Beträge und negative Trinkgeld-Prozente werden explizit abgelehnt.
- Die Personenzahl wird zusätzlich auf `Number.isInteger` geprüft und muss mindestens 1 sein – nicht-ganzzahlige und null/negative Werte werden abgewiesen.
- Die Unit-Tests in `src/lib/calculator.test.ts` decken alle relevanten ungültigen Fälle ab.
- **Kein Verstoß.**

### Scanner-Auswertung (npm audit)

Die Meldungen des npm-Audits betreffen ausschließlich die Entwicklungs- und Test-Toolchain (`vite`, `vitest`, `@vitest/mocker`, `vite-node`, `esbuild`). Keine dieser Komponenten ist Teil der ausgelieferten statischen SPA; sie werden für Build, Dev-Server und Testläufe verwendet. Die Schwachstellen sind daher **nicht im Produktpfad ausnutzbar** und verletzen **kein im Spec vereinbartes Security-Kriterium** (insbesondere nicht AC-07 oder AC-08). Sie werden deshalb als nicht blockierende Hinweise geführt.

Konkrete festgestellte Advisories (Interpretation):
- **vitest** (`severity: critical`, CVSS 9.8) – Betrifft den Vitest-UI-Server (`<3.2.6`). Standardmäßig wird der UI-Server nicht durch `npm test` gestartet; das Risiko besteht nur, wenn der UI-Server absichtlich exponiert wird.
- **vite** (`severity: high`, u. a. `server.fs.deny` bypass auf Windows) – Betrifft den Vite-Dev-Server, nicht den Produktions-Build.
- **@vitest/mocker**, **vite-node**, **esbuild** – moderate Schwachstellen im Entwicklungs-/Test-Stack.

Da semgrep nicht installiert war (`[skipped]`), fehlt ein ergänzender SAST-Lauf. Aus diesem Fehlen wird **kein** Befund und kein Verdikt abgeleitet.

### Weitere geprüfte Bereiche

- **Secrets:** Keine hartkodierten Schlüssel, Passwörter oder Token im sichtbaren Code.
- **AuthN/AuthZ:** Nicht anwendbar – reine Frontend-Anwendung ohne Authentifizierung.
- **Konfiguration/Transport:** Keine unsicheren Defaults, kein offenes CORS, keine Debug-Modi. `vite.config.ts` enthält keine Exposition des Dev-Servers (bindet nicht an `0.0.0.0`). Es gibt kein CSP, was für diese reine statische App ein optionales Härtungsthema darstellt, aber kein vereinbartes Kriterium verletzt.

## Notes (non-blocking)

1. **Abhängigkeiten aktualisieren (Empfehlung):**  
   Aktuell installierte Versionen von `vite` und `vitest` weisen bekannte, teils kritische Schwachstellen im Entwicklungs-/Test-Tooling auf. Da diese nicht in der ausgelieferten SPA laufen, kein Verdikt, aber zur Härtung der CI-/Entwicklungsumgebung sollten sie aktualisiert werden:
   - `vite` auf mindestens **8.3.0** (behebt u. a. `GHSA-fx2h-pf6j-xcff`, `GHSA-4w7w-66w2-5vf9`, `GHSA-v6wh-96g9-6wx3` und die esbuild-Meldung `GHSA-67mh-4wv8-2f99`).
   - `vitest` auf mindestens **5.0.0** (behebt u. a. `GHSA-5xrq-8626-4rwp` und `GHSA-82fw-gwwq-j7x9`).
   - Konkret: `npm install -D vite@^8.3.0 vitest@^5.0.0` ausführen und `package-lock.json` aktualisieren.

2. **SAST-Lücke schließen:**  
   semgrep war in der Scan-Umgebung nicht installiert. Für künftige Prüfungen sollte semgrep verfügbar gemacht werden, um eine tiefere statische Analyse zu ermöglichen.

3. **Lesson für die nächste Planung:**  
   Es existiert kein Security-Kriterium, das Dependency-Sicherheit (z. B. „keine bekannten kritischen CVEs in direkt genutzten Build-/Test-Abhängigkeiten“) abdeckt. Ein solches Kriterium würde solche Findings künftig in den Verdict-Prozess einbeziehen.