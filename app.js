import express from 'express';
import multer from 'multer';
import * as mammoth from 'mammoth';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// __dirname für ES6 definieren
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temporärer Upload-Ordner

app.use(express.static(join(__dirname, 'public')));

// Optionen für Mammoth.js (Tabellen und Bilder einbinden)
const mammothOptions = {
    convertImage: mammoth.images.inline((image) => {
        return image.read("base64").then((imageData) => {
            return {
                src: `data:${image.contentType};base64,${imageData}`
            };
        });
    }),
    styleMap: [
        "p[style-name='Normal'] => p:fresh",
        "table => table:fresh",
        "tr => tr:fresh",
        "tc => td:fresh" // Zellen als HTML-TD
    ]
};

// Route: Formular anzeigen
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public/index.html'));
});

// Route: Datei hochladen und konvertieren
app.post('/upload', upload.single('wordFile'), async (req, res) => {
    try {
        const filePath = req.file.path;

        // Verarbeite die Datei mit Mammoth
        const result = await mammoth.convertToHtml({ path: filePath }, mammothOptions);

        // HTML-Seite mit Inhalt zurückgeben
        res.send(`
            <html>
                <head>
                    <title>Word-Datei Vorschau</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            margin: 20px;
                        }
                        table {
                            border-collapse: collapse;
                            width: 100%;
                            margin: 20px 0;
                        }
                        table, th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                            display: block;
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    <h1>Inhalt der Word-Datei:</h1>
                    ${result.value}
                    <a href="/">Zurück zur Upload-Seite</a>
                </body>
            </html>
        `);

        // Temporäre Datei löschen
        fs.unlinkSync(filePath);
    } catch (err) {
        console.error('Fehler beim Verarbeiten der Datei:', err);
        res.status(500).send('Fehler beim Verarbeiten der Datei.');
    }
});

// Server starten
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server läuft auf http://localhost:${PORT}`));
