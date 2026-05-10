# Izla & Gabriel Hochzeit Website

Eine kleine Website für die Hochzeit von Izla & Gabriel.

## Für Gabriel: Website öffnen, ohne irgendwas kaputt zu machen

Keine Sorge. Du musst kein Hacker sein. Du musst nur genau diese Schritte machen.

## 1. Projekt öffnen

Öffne den Ordner:

```bash
gabrielizla
```

Falls du in Cursor oder VS Code bist: einfach den ganzen Ordner öffnen, nicht irgendeine einzelne Datei aus `dist`.

## 2. Terminal öffnen

In Cursor/VS Code:

```bash
Terminal -> New Terminal
```

Das Terminal muss im Projektordner sein. Wenn da ungefähr sowas steht, bist du richtig:

```bash
c:\Users\jakob\Documents\gabrielizla
```

## 3. Pakete installieren

Das musst du normalerweise nur einmal machen:

```bash
npm install
```

Wenn das fertig ist und keine roten Katastrophen auftauchen, weiter mit Schritt 4.

## 4. Website lokal starten

```bash
npm run dev
```

Danach zeigt das Terminal eine Adresse an, meistens:

```bash
http://localhost:5173
```

Diese Adresse im Browser öffnen.

## 5. Website stoppen

Wenn du fertig bist:

```bash
Ctrl + C
```

Dann fragt das Terminal eventuell nach Bestätigung. Einfach `Y` drücken und Enter.

## Was du NICHT machen solltest

- Nicht in `node_modules` rumklicken und irgendwas ändern.
- Nicht nur `dist/index.html` öffnen und dich wundern, warum sich Änderungen komisch verhalten.
- Nicht zufällig Dateien löschen, nur weil sie komische Namen haben.
- Nicht panisch werden. Erst lesen, dann klicken.

## Änderungen bauen

Wenn du die finale Version testen willst:

```bash
npm run build
```

Das erzeugt den fertigen Ordner `dist`.

## Kurzfassung für sehr Eilige

```bash
npm install
npm run dev
```

Dann Browser öffnen:

```bash
http://localhost:5173
```

Fertig. Gabriel hat es geschafft.
