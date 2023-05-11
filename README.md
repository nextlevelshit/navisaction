# NAVIS Peerhof 2023 🚀

Willkommen beim NAVIS Peerhof 2023 Projekt! Dieses charmante und technisch ausgeklügelte Projekt wurde von einer Gruppe
von Freunden ins Leben gerufen, die auf ihrer Reise der veganen Lebensweise frönen und gleichzeitig die Welt der Bild-
und Mediengalerien neu erfinden möchten - alles mit einer Prise österreichischer Ironie! Nach einer unvergesslichen
Woche im wunderschönen Navis-Tal in der Nähe von Innsbruck haben wir uns von der atemberaubenden Natur und der
tierfreundlichen Küche inspirieren lassen, um dieses vegane Kunstwerk zu kreieren.

## Projektstruktur 📁

Das Projekt ist in drei Hauptordner unterteilt:

- api: Hier befindet sich der Backend-Teil der Anwendung, entwickelt mit Node.js, Express und einer Reihe von
  Mittelwaren.
- web: Hier ist der Frontend-Teil, entwickelt mit Svelte und Vue.
- proxy: Enthält die Konfigurationsdateien für den Reverse-Proxy mit HAProxy.

## Installation 🛠️

Um das Projekt zum Laufen zu bringen, führen Sie einfach die folgenden Schritte aus:

1. Stellen Sie sicher, dass Docker und Docker Compose auf Ihrem System installiert sind. Wenn nicht, besuchen Sie die
   offizielle Docker-Dokumentation für Anweisungen zur Installation.

2. Klone das Projekt auf deinen Computer:
    ```shell
    git clone https://github.com/your-repository/navis-peerhof-2023.git
    cd navis-peerhof-2023
    ```

3. Erstelle eine `.env` Datei im Hauptverzeichnis des Projekts, die die notwendigen Umgebungsvariablen für das Projekt
   enthält. Hier ein Beispiel:
    ```shell
    APP_HOST=navispeerhof.local
    API_PORT=3000
    WEB_PORT=8080
    API_URL=http://localhost:3000
    CERT_HOST=navispeerhof.local
    ```

4. Führe `docker-compose up` aus, um die Anwendung zu starten. Das war's! Ihr könnt die App nun
   unter `http://localhost:8080` oder `https://navispeerhof.local` aufrufen, solange du vorher ein Zertifikat generiert
   hast. Viel Spaß beim Erkunden der Galerie!

## Navis-Tal Spezialitäten 🌿

Während unserer Woche im Navis-Tal haben wir uns an einige köstliche lokale vegane Spezialitäten erfreut, die wir euch
natürlich nicht vorenthalten möchten:

- Vegane Spinatknödel: Diese leckeren Knödel aus Spinat, Kartoffeln und Gewürzen sind ein wahrer Genuss und ein
  absolutes Muss für alle, die die vegane Tiroler Küche entdecken möchten.
- Veganes Gröstl: Eine herzhafte Pfanne aus Bratkartoffeln, veganem Fleischersatz und Zwiebeln, serviert mit einem
  veganen Rührei aus Kichererbsenmehl. Ein wärmendes Gericht nach einem Tag in den Bergen!
- Vegane Kaiserschmarrn: Süßer, luftiger Pfannkuchen, zerrissen und serviert mit Puderzucker und Apfelmus oder
  Preiselbeermarmelade. Ein wahr gewordener veganer Desserttraum!
- Almdudler: Ein erfrischendes österreichisches Kräuterlimonadengetränk, das perfekt zu den veganen Gerichten passt oder
  einfach zum Genießen auf der Terrasse einer Almhütte ist.

## Besondere Erwähnungen 🏆

Ein besonderer Dank geht an:

- Fritz, der Meister des Frontends, der unermüdlich an der Benutzeroberfläche gefeilt hat.
- Lisa, die Königin der APIs, deren Backend-Zauberei dieses Projekt erst möglich gemacht hat.
- Andi, der Proxy-Papst, der dafür gesorgt hat, dass alle Anfragen dorthin gelangen, wo sie hingehören.

## Abschließende Gedanken 💭

Wir hoffen, dass Sie beim Stöbern in diesem Projekt genauso viel Spaß haben wie wir bei der Entwicklung! Vergessen Sie
nicht, es mit Ihren Freunden und Kollegen zu teilen. Und wie wir hier in Österreich sagen: "Ein Leben ohne Ironie ist
wie ein Krapfen ohne Marmelade!" 😂

Viel Spaß und happy coding! 🎉
