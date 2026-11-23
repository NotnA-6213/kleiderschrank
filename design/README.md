# Design-Entwürfe Kleiderschrank-App

Klickbare Entwürfe für die vier Hauptscreens, in zwei Looks.
Sie sind **Vorlage**, nicht der Code der App: Die App wird später neu und
schlanker gebaut, diese Dateien zeigen nur, wie sie aussehen soll.

## Ansehen

- In VS Code: Rechtsklick auf `design/index.html` → **Open with Live Server**
- Online (nach dem Pushen): `https://BENUTZERNAME.github.io/kleiderschrank/design/`
- Einzelne Screens öffnen sich auch direkt, z. B. `design/atelier/schrank.html`
- Dunkelmodus direkt aufrufen: `design/atelier/schrank.html?theme=Dunkel`

## Inhalt

| Ordner / Datei | Inhalt |
| --- | --- |
| `index.html` | Übersicht aller Screens |
| `matchday/` | Look „Matchday Night“: dunkel, Blau als Akzent |
| `atelier/` | Look „Atelier“: hell und dunkel umschaltbar, Rot als Akzent |
| `screenshots/` | Alle Screens als Bild, zum Anhängen im Copilot-Chat |
| `support.js` | Kleine Hilfsdatei, damit die Entwürfe im Browser laufen. Nicht für die App verwenden. |

## Die vier Screens

1. **Mein Schrank:** Übersicht als Kachel-Raster, Filter nach Kategorie, Navigation unten, Kamera-/Plus-Button
2. **Teil erfassen:** Foto, erkannte Farben, Kategorie, Größe, Preis, Status „Behalten / Verkaufen“
3. **Kombinieren:** Outfit aus Oberteil, Hose, Schuhen; Wetterhinweis; „Überrasch mich“
4. **Anzeige vorbereiten:** Titel und Beschreibung zum Kopieren, Preisvorschlag, Gewinn/Verlust

## Design-Werte

### Look „Atelier“

| Rolle | Hell | Dunkel |
| --- | --- | --- |
| Hintergrund `--bg` | `#F4F3EF` | `#101012` |
| Karte `--card` | `#FFFFFF` | `#1B1B1F` |
| Karte 2 `--card2` | `#ECEAE4` | `#26262B` |
| Linie `--line` | `#E1DED6` | `#2F2F35` |
| Text `--ink` | `#16161A` | `#F4F3EF` |
| Text leise `--mute` | `#5F5E66` | `#A9A8B0` |
| Akzent `--acc` | `#C8363C` | `#FF6E6A` |
| Text auf Akzent `--onacc` | `#FFFFFF` | `#1A0B0B` |

- Schriften: Überschriften **Bricolage Grotesque** (800), Text **Inter** (400–600)
- Formen: Buttons als Pillen (`border-radius: 999px`), Karten 20–28 px Rundung
- Hell/Dunkel: über CSS-Variablen; in der App zusätzlich `prefers-color-scheme` beachten und die Wahl speichern

### Look „Matchday Night“

| Rolle | Wert |
| --- | --- |
| Hintergrund | `#0E0F13` |
| Karte | `#181A21` |
| Linie | `#2C303B` |
| Text | `#F2F3F5` |
| Text leise | `#A3A8B5` |
| Akzent | `#3563F0` |
| Signal „Verkaufen“ | `#FF9AAA` auf `#2A1218` |

- Schriften: Überschriften **Space Grotesk** (700), Text **Inter**
- Formen: Karten 18 px, Buttons 12–18 px Rundung

### Für beide Looks

- Handy zuerst: Breite 390 px als Referenz, Seitenabstand 20 px
- Tippflächen mindestens 44 × 44 px
- Icons als Linien-SVG, keine Emojis
- Keine Vereinslogos oder Markennamen im Design (Markenrecht)

## So nutzt du das mit Copilot

1. Screenshot aus `screenshots/` in den Copilot-Chat ziehen.
2. Prompt, zum Beispiel:
   > Baue Issue #1 im Stil von diesem Screenshot. Nutze die Farben und
   > Schriften aus `design/README.md`, Look „Atelier“. Erstelle zuerst einen
   > Plan und ändere noch nichts.
3. Plan prüfen, freigeben, Ergebnis mit dem Entwurf vergleichen.

Tipp: In `.github/copilot-instructions.md` eine Zeile ergänzen:
`Design-Vorgaben stehen in design/README.md, verwende den Look „Atelier“.`
