# **Word to Web**

Ein Node.js-Projekt zur Konvertierung von Word-Dateien (.docx) in HTML, einschließlich Tabellen, Bildern und Textformatierungen.

---

## **Features**
✅ Hochladen von `.docx`-Dateien über eine Weboberfläche.  
✅ Automatische Konvertierung des Inhalts (Tabellen, Bilder und Text) in HTML.  
✅ Anzeige der Ergebnisse auf einer Webseite.  
✅ Bereitstellung über Docker für einfache Installation und Nutzung.  

---

## **Voraussetzungen**

Um dieses Projekt zu nutzen, benötigst du:  
1. **Docker**: [Installiere Docker](https://www.docker.com/get-started)  
2. **Docker Compose**: [Installiere Docker Compose](https://docs.docker.com/compose/install/)  

---

## **Schritte zur Nutzung**

### **1. Docker-Container starten**
Starte das Projekt mit Docker Compose:  
```bash
docker-compose up -d
```

### **2. Anwendung aufrufen**
Öffne einen Browser und gehe zu:
http://localhost:3000

### **3. Word-Dateien hochladen**
Wähle eine .docx-Datei aus und lade sie über die Weboberfläche hoch.

Der Inhalt der Datei (inkl. Tabellen und Bilder) wird auf der Webseite angezeigt.


### **Projektstruktur**

project/
│
├── app.js              # Hauptservercode
├── package.json        # Abhängigkeiten und Projektinformationen
├── Dockerfile          # Docker-Konfiguration für den Node.js-Server
├── docker-compose.yml  # Docker Compose-Konfiguration
├── public/             # Frontend (HTML, CSS)
│   └── index.html      # Upload-Formular
├── uploads/            # Temporärer Ordner für hochgeladene Dateien
└── .dockerignore       # Dateien, die im Docker-Build ignoriert werden



### **Technologien**
Node.js: Serverseitige Logik.
Express.js: Framework für den Webserver.
Mammoth.js: Konvertierung von Word-Dokumenten in HTML.
Docker: Containerisierung der Anwendung.
Docker Compose: Multi-Container-Management.