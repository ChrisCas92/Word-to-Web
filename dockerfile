# Verwende den offiziellen Node.js-Image
FROM node:18-alpine

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere package.json und package-lock.json (falls vorhanden)
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den gesamten Projektinhalt in den Container
COPY . .

# Der Container läuft auf Port 3000
EXPOSE 3000

# Startbefehl für die Anwendung
CMD ["npm", "start"]
