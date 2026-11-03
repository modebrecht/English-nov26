# Accessories · Classroom Solutions

Interaktive, **mobile-first Lehreransicht** für die fünf fotografierten Englisch-Arbeitsblattseiten **41–45** (Exercises **1–9**). Gedacht für einen Lehrpersonen-Laptop, ein Smartphone oder einen Beamer.

## Sofort benutzen

**Einzige Datei, ohne Installation:** `classroom-standalone.html` herunterladen, lokal im Browser öffnen und die Lösungen nacheinander zeigen. Alle benötigten Zeichnungen, Stile, Daten und Skripte sind eingebaut. Keine Internetverbindung erforderlich.

**GitHub / GitHub Pages:** Den *gesamten* Projektordner mit `index.html`, `styles.css`, `data.js`, `app.js` und `assets/` in ein GitHub-Repository hochladen. GitHub Pages unter **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)** aktivieren. Es gibt keinen Build-Schritt, keinen API-Schlüssel und keine Anmeldung.

Die Standalone-Datei kann ebenfalls im Repository bleiben, ist für GitHub Pages aber nicht nötig.

## Aufgaben

| Seite | Übung | Inhalt | Lösungs-Schritte |
|---|---|---|---:|
| 41 | 1 | Wortsuchrätsel: jewellery | 6 |
| 41 | 2 | Taking with them: Bilder + Sätze | 4 |
| 42 | 3 | Grammar + giving her/him | 4 |
| 43 | 4 | Kreuzworträtsel | 6 |
| 43 | 5 | Have you got / it / them | 6 |
| 44 | 6 | Wortsuchrätsel: TIFFANY’S | 7 |
| 44 | 7 | Bilderkreuzworträtsel: BREAKFAST at TIFFANY’S | 8 |
| 45 | 8 | Unscramble and match | 4 |
| 45 | 9 | 15 Wörter + HAVE YOU GOT GLASSES? + Antwortbeispiele | 17 |

## Lehrer-Bedienung

- **Nächste Lösung**: ein Wort / eine Antwort / ein Kreuzworträtsel-Eintrag pro Klick. Geheimwörter und die Antwort in Exercise 9 erscheinen als eigene Schritte.
- **Zurück**: zuletzt eingeblendeten Schritt wieder verbergen.
- **Alle zeigen / Verbergen**: nur die aktuell geöffnete Übung.
- **Seite / Exercise**: direkt zu einer Übung springen; Fortschritt wird pro Übung gemerkt.
- **Schriftregler**: 85–190 %, plus/minus. **Beamer** stellt einen grossen, kontrastreichen Präsentationsmodus ein; **Vollbild** maximiert die Browseransicht.
- **Marker**: einschalten und auf eine Aufgabe oder Buchstabenzelle klicken, um sie zusätzlich gelb hervorzuheben. Nochmals klicken entfernt die Markierung.
- **Neustart**: nach Bestätigung alle Übungen wieder auf null, etwa für die nächste Klasse.
- **Hell/Dunkel**: Umschalten für verschiedene Beamer und Raumverhältnisse.

**Tastatur:** `→` bzw. `Leertaste` nächste Lösung; `←` zurück; `A` alle zeigen; `H` verbergen; `F` Vollbild; `+` / `−` Schriftgrösse.

Die Anzeigeeinstellungen und bereits gezeigten Lösungen bleiben, soweit der Browser es zulässt, lokal im `localStorage` erhalten. Es findet **keine Datenübertragung** statt. Der Lehrer kann alles mit **Neustart** zurücksetzen.

## Anpassungen

Die Aufgabeninhalte stehen in `data.js`: Hier lassen sich Texte, Wörter, Wortgitter-Koordinaten und Lösungen ändern. Die Bedienung befindet sich in `app.js`, das Layout in `styles.css`. Danach `scripts/build_single_file.py` ausführen, um die Standalone-Datei zu aktualisieren (benötigt nur Python 3).

**Wichtig:** Die Standalone-Datei wird aus den Projektdateien generiert; redigiere nicht beide Varianten unabhängig voneinander.

## Inhaltliche Prüfung

- Bei beiden kleinen Wortsuchrätseln und dem grossen mit 15 Wörtern sind Wortpositionen und die übrig gebliebenen Buchstaben programmgesteuert gegengeprüft: **JEWELLERY!**, **TIFFANYS**, **HAVEYOUGOTGLASSES**.
- Beide Kreuzworträtsel sind auf korrekt überlappende Buchstaben geprüft. Die neun grauen Kästchen in Exercise 7 ergeben **BREAKFAST**.
- Desktop und Mobile wurden mit Chromium getestet: Navigation, Einzelschritt, Komplettlösung, Rücksetzen, Marker, Schriftregler, Hell/Dunkel und keine horizontale Seitenüberbreite.

## Bildrechte & Veröffentlichung

Einige kleine Bildhinweise sind **aus den vom Nutzer fotografierten Schulbuchseiten ausgeschnitten**. Sie sind ausschliesslich für die private Unterrichtsvorbereitung bzw. rechtmässig gestattete Nutzung vorgesehen. Die Rechte an Schulbuchmaterial und Illustrationen bleiben beim jeweiligen Verlag bzw. Rechteinhaber.

**Vor dem Hochladen in ein öffentliches GitHub-Repository oder der öffentlichen Freigabe über GitHub Pages die nötigen Nutzungsrechte prüfen.** Ohne Freigabe besser ein **privates Repository** verwenden und die Standalone-Datei lokal öffnen. Auch bei öffentlicher Verbreitung der übernommenen Aufgabenstellungen sind Urheberrechte zu beachten.

## GitHub-Variante

Auf `main` ist `index.html` die GitHub-Pages-Startseite. Sie lädt die bearbeitbaren `styles.css`, `data.js`, `assets.js` (eingebettete Illustrationen) und `app.js`. `classroom-standalone.html` ist die vollständig eigenständige Offline-Kopie. Nach Änderungen an den Quelldateien die Offline-Kopie mit `python3 scripts/build_single_file.py` regenerieren. Für GitHub Pages: Settings → Pages → Deploy from a branch → main / (root). Beachte den Abschnitt Bildrechte & Veröffentlichung oben.
