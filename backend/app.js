// app.js – Konfiguriert die Express-Anwendung

const express = require('express');   // Importiert Express, um eine Webanwendung zu erstellen
const cors = require('cors'); // Erlaubt Cross-Origin Resource Sharing (CORS) für Anfragen von anderen Domains
const dotenv = require('dotenv'); // Lädt Umgebungsvariablen aus .env
const db = require('./models/db'); // Importiert die Datenbankverbindung
const authRoutes = require('./routes/authRoutes'); // Importiert die Authentifizierungsrouten
dotenv.config(); // Lädt Umgebungsvariablen aus .env

const app = express();

app.use(cors()); // Erlaubt Anfragen von anderen Domains (z. B. frontend)
app.use(express.json()); // Ermöglicht JSON-Daten im Body von Requests

// Test-Route
app.get('/', (req, res) => { 
  res.send('Kochbuch API läuft!'); // Einfacher Test, um zu prüfen, ob die API läuft
});

module.exports = app; // Exportiert die App für server.js





// Middleware
app.use(cors()); // CORS aktivieren, um Anfragen von anderen Domains zu erlauben
app.use(express.json()); // JSON-Daten im Body von Requests erlauben
app.use('/api/auth', authRoutes); // Authentifizierungsrouten

// Testroute
app.get('/', (req, res) => {
  res.send('Kochbuch API läuft!');
});

// Auth-API
app.use('/api/auth', authRoutes); // z. B. POST /api/auth/register

module.exports = app; // Exportiert die Express-App für server.js
