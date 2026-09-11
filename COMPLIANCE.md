VERDICT: APPROVED

Geprüft wurde der im Sprint-Spec definierte, vollständig gemergte Stand der React-/Vite-SPA „Trinkgeld-Rechner“. Maßgeblich sind die Acceptance Criteria AC-01 bis AC-08. Eine Verletzung dieser Kriterien ist nicht erkennbar.

## 1. DSGVO / Datenschutz

### 1.1 Verarbeitung personenbezogener Daten durch den Anbieter – kein Befund
Die App arbeitet ausschließlich clientseitig. Betrag, Trinkgeld-Prozent und Personenzahl werden nur im React-State (`useState`) gehalten. Es gibt im sichtbaren Code keine Netzwerkaufrufe, keine Cookies, kein `localStorage`/`sessionStorage` und keine Logging-Mechanismen, die Nutzereingaben an den Anbieter übertragen oder speichern.

Damit verarbeitet der Anbieter dieser statischen SPA nach dem sichtbaren Stand selbst keine personenbezogenen Daten. Für diesen Verarbeitungsweg ist keine gesonderte Rechtsgrundlage erforderlich. Mögliche Webserver-Logs beim Hosting (z. B. IP-Adressen) liegen außerhalb des Repositorys und sind beim tatsächlichen Betrieb zu prüfen.

### 1.2 Datenschutzerklärung und Anbieterkennzeichnung – nicht blockierender Hinweis
Öffentlich erreichbare Web-UIs benötigen regelmäßig eine Anbieterkennzeichnung nach § 5 DDG („Impressum“). Eine solche sowie eine Datenschutzerklärung sind im Produkt nicht vorhanden. Da diese Pflichttexte nicht Bestandteil der Sprint-Acceptance-Criteria sind, ist dies ein nicht blockierender Hinweis (note) und kein Sprint-Blocker.

**Maßnahme:**  
Neue Datei `src/components/Footer.tsx` ergänzen und in `src/App.tsx` einbinden. Footer mit Links „Impressum“ und „Datenschutz“ versehen. Inhalte als statische Seiten oder Modal umsetzen und die tatsächlichen Anbieterdaten eintragen.

## 2. EU Cyber Resilience Act (CRA)

### 2.1 Relevanz und sichtbarer Stand
Das Produkt ist ein Produkt mit digitalen Elementen und fällt grundsätzlich in den CRA-Anwendungsbereich. Im sichtbaren Code sind keine sicherheitskritischen Schwachstellen erkennbar. Die Rendering-Logik erfüllt AC-07 (keine HTML-Injektion) und AC-08 (defensive Eingabevalidierung).

### 2.2 Offene Hinweise ohne AC-Verstoß
- **SBOM/Abhängigkeiten:** Es gibt keine explizite SBOM-Datei, aber `package-lock.json` ist vorhanden und pinnt die Abhängigkeiten. Als Hinweis: SBOM im SPDX- oder CycloneDX-Format ergänzen.  
- **Sicherheits-/Support-Dokumentation:** Eine dokumentierte Beschreibung der Sicherheitseigenschaften und des Update-Verfahrens fehlt.  
- **Lizenzangabe:** `package.json` enthält kein `license`-Feld.  

**Maßnahmen:**  
- In `package.json` ein `"license": "MIT"` (oder die tatsächlich gewünschte Lizenz) setzen.  
- In `README.md` einen Abschnitt „Sicherheit & Updates“ ergänzen.  
- Optional CI um `npm audit` und SBOM-Erzeugung erweitern.

Die verwendeten Drittbibliotheken weisen keine offensichtlich kritischen oder inkompatiblen Lizenzen auf.

## 3. EU AI Act

Nicht anwendbar. Das Produkt enthält keine KI-Funktion, kein maschinelles Lernen und keine automatisierte Entscheidungsfindung.

## 4. Pflichttexte, Cookies und Einwilligungen

Die App setzt keine Cookies, nutzt kein Tracking und keine Drittdienste. Eine Cookie- oder Consent-Banner-Pflicht besteht daher nicht.

Eine Datenschutzerklärung im engeren Sinne könnte sich auf die reine lokale Verarbeitung und mögliche Hosting-Logs beschränken. Impressum und Datenschutz bleiben als nicht blockierende Hinweise bestehen (siehe Abschnitt 1.2).

## 5. Barrierefreiheit

Positiv:
- Eingabefelder sind über `label htmlFor` korrekt verknüpft.
- Die Fehlermeldung hat `role="alert"`.
- Es gibt sichtbare Fokus-Styles.
- Eingabefelder haben eine Mindesthöhe von 44 px.

Nicht blockierender Hinweis:
- Die sich live ändernden Ergebnisse werden Screenreadern nicht automatisch angekündigt.

**Maßnahme:**  
In `src/App.tsx` den Ergebniscontainer `<div className="results" aria-live="polite">` ergänzen. Die bestehende Fehlermeldung behält zusätzlich `role="alert"`.

## 6. Erfüllung der Acceptance Criteria

AC-01 bis AC-08 sind nach Sichtprüfung erfüllt:
- AC-01: Eingabe- und Ausgabefelder werden gerendert.
- AC-02/AC-03: Berechnung und Rundung verhalten sich wie gefordert.
- AC-04/AC-05: Ungültige Eingaben erzeugen Fehler; Korrektur entfernt den Fehler.
- AC-06: Unit-Tests der Berechnungsfunktion sind vorhanden.
- AC-07: Keine `dangerouslySetInnerHTML`-, `innerHTML`- oder HTML-Injektionspfade sichtbar.
- AC-08: Validierung prüft numerischen Typ, Negativwerte und Ganzzahligkeit der Personenzahl.